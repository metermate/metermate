angular
  .module('metermate.map', [])
  .controller('MapCtrl', function($scope, $window, Map) {
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
              active: meterData[i].active,
              area: meterData[i].area,
              street_address: meterData[i].street_address,
              event_type: meterData[i].event_type,
              event_time: meterData[i].event_time
            });

            // makes meter status user-friendly (info window)
            if(meterData[i].active === '1') {
              marker.active = 'Active';
            } else if(meterData[i].active === '0') {
              marker.active = 'Out of Service';
            }

            // makes area titlecase (info window)
            if(meterData[i].area === 'DOWNTOWN-CBD') {
              marker.area = 'Downtown-Central Business District';
            } else {
              var areaStr = marker.area;
              marker.area = areaStr.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');
            }

            // makes approx. address titlecase (info window)
            var addressStr = marker.street_address;
            marker.street_address = addressStr.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');

            // sets green marker if meter is available
            if(meterData[i].event_type === 'SE') {
              console.log('<-- # of available meters');
              marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            }

            markers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function () {
                infowindow.setContent('<p><strong>Status:</strong>&nbsp;&nbsp;' + marker.active + '</p>' + '<p><strong>Area:</strong>&nbsp;&nbsp;' + marker.area + '</p>' + '<p><strong>Approx. Address:</strong>&nbsp;&nbsp;' + marker.street_address + '</p>' + contentString);
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
});
