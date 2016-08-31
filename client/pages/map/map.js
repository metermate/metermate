angular
  .module('metermate.map', [])
  .controller('MapCtrl', function($scope, $window, Map, FindCurrentLocation) {
    var meterData = [];

    $window.onload = function() {
      Map.getMeterData()
        .then(function(data) {
          console.log('Data from getMeterData in MapCtrl: ', data);
          meterData = data;

          var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(34.019325, -118.494809),
            zoom: 19,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          var markers = [];
          var contentString = '<div id="content" style="width:375px;height:200px;"></div>';
          var infowindow = new google.maps.InfoWindow();

          for (var i = 0; i < meterData.length; i++) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(meterData[i].latitude, meterData[i].longitude),
              animation: google.maps.Animation.DROP,
              id: meterData[i].meter_id,
              area: meterData[i].area,
              active: meterData[i].active,
              street_address: meterData[i].street_address,
              event_type: meterData[i].event_type,
              event_time: meterData[i].event_time
            });

            if(meterData[i].event_type === 'SE') {
              console.log('<-- # of available meters');
              marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            }
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function () {
                infowindow.setContent('<p> Status: ' + marker.active + '</p>' + '<p> Area: ' + marker.area + '</p>' + '<p> Approx. Address: ' + marker.street_address + '</p>' + contentString);
                infowindow.open(map, this);

                var pano = null;
                google.maps.event.addListener(infowindow, 'domready', function () {
                  if (pano != null) {
                    pano.unbind('position');
                    pano.setVisible(false);
                  }
                  pano = new google.maps.StreetViewPanorama(document.getElementById('content'), {
                    navigationControl: true,
                    navigationControlOptions: { style: google.maps.NavigationControlStyle.ANDROID },
                    enableCloseButton: false,
                    addressControl: false,
                    linksControl: false
                  });
                  pano.bindTo('position', marker);
                  pano.setVisible(true);
                });

                google.maps.event.addListener(infowindow, 'closeclick', function () {
                  pano.unbind('position');
                  pano.setVisible(false);
                  pano = null;
                });
              }
            })(marker, i));
          }

          google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
          });

          for (var i = 0; i < markers.length; i++) {
            console.log('<-- total # of meters');
            markers[i].setMap(map);
          }

          var input = document.getElementById('pac-input');
          var searchBox = new google.maps.places.SearchBox(input);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
          map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
          });
          searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
              return;
            }
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
           if (!place.geometry) {
             console.log("Returned place contains no geometry");
             return;
           }

           if (place.geometry.viewport) {
             // Only geocodes have viewport.
             bounds.union(place.geometry.viewport);
           } else {
             bounds.extend(place.geometry.location);
           }
         });
          map.fitBounds(bounds);
          })

          var options = {
            imagePath: '../../content/images/m',
            gridSize: 80,
            maxZoom: 20,
            zoomOnClick: true,
            averageCenter: true,
            minimumClusterSize: 5
          };

          var markerCluster = new MarkerClusterer(map, markers, options);

          var centerControlDiv = document.createElement('div');
          centerControlDiv.innerHTML = '<button id="locateMe">Find Your Location</button>';
          centerControlDiv.onclick = function() {
            FindCurrentLocation.centerMap(map);
          }
          map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv, map);
        })
        .catch(function(error) {
          console.error('Error retrieving data from getMeterData: ', error);
        })
    };
  })
  .factory('Map', function($http) {
    return {
      getMeterData: getMeterData
    };

    function getMeterData() {
      return $http({
        method: 'GET',
        url: '/api/get-meter-data'
      })
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    };
  })
  .factory('FindCurrentLocation', function(){
    return {
      centerMap: centerMap
    };

    function centerMap(map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          map.setCenter(pos); //Centers map on current location.
          var currentLocationPin = new google.maps.Marker({ // Creates a pin at current location
            position: new google.maps.LatLng(pos.lat, pos.lng), // Sets position prop to geolocation
            animation: google.maps.Animation.DROP
            // icon: '../../content/images/',
          });
          currentLocationPin.setMap(map); // Adds a pin to your current location
        })
      } else {
        error('Geo Location is not supported');
      }
    }
});
