angular
  .module('metermate.map', [])
  .controller('MapCtrl', function($scope, $window, Map) {
    var meterData = [];

    $window.onload = function() {
      Map.getMeterData()
        .then(function(data) {
          console.log('Data from getMeterData in MapCtrl: ', data);
          meterData = data;

          /* ---------- GOOGLE MAP ---------- */
          var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(34.019325, -118.494809), // sets default center to MKS
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          /* ---------- MARKERS ---------- */
          var markers = [];
          var meterIcon = {
            size: new google.maps.Size(18, 51),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(9, 51),
            scaledSize: new google.maps.Size(18, 51)
          };

          for (var i = 0; i < meterData.length; i++) {
            // creates marker for each meter in meterData array
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(meterData[i].latitude, meterData[i].longitude),
              id: meterData[i].meter_id,
              active: meterData[i].active,
              area: meterData[i].area,
              street_address: meterData[i].street_address,
              event_type: meterData[i].event_type,
              event_time: meterData[i].event_time
            });

            // makes area titlecase (for info window)
            if(meterData[i].area === 'DOWNTOWN-CBD') {
              marker.area = 'Downtown-Central Business District';
            } else {
              var areaStr = marker.area;
              marker.area = areaStr.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');
            }

            // makes approx. address titlecase (for info window)
            var addressStr = marker.street_address;
            marker.street_address = addressStr.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');

            // shows green meter if available, red meter if occupied
            if(meterData[i].event_type === 'SE') {
              console.log('<-- # of available meters');
              meterIcon.url = '../../content/images/meter_icon_green.png';
              marker.setIcon(meterIcon);
              marker.status = 'Available';
            } else {
              meterIcon.url = '../../content/images/meter_icon_red.png';
              marker.setIcon(meterIcon);
              marker.status = 'Occupied';
            }

            markers.push(marker);

            /* ---------- INFO WINDOW ---------- */
            var infoWindow = new google.maps.InfoWindow();
            var streetViewBox = '<div id="street-view-box" style="width:375px;height:200px;"></div>';

            // opens info window when user clicks on a marker
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function () {
                // adds meter status, area, and address in info window
                infoWindow.setContent(
                  '<p><strong>Current Status:</strong>&nbsp;&nbsp;' + marker.status + '</p>' + '<p><strong>City Area:</strong>&nbsp;&nbsp;' + marker.area + '</p>' + '<p><strong>Approx. Address:</strong>&nbsp;&nbsp;' + marker.street_address + '</p>' + streetViewBox
                );
                infoWindow.open(map, this);

                // adds street view box in info window
                var pano = null;
                google.maps.event.addListener(infoWindow, 'domready', function () {
                  if (pano != null) {
                    pano.unbind('position');
                    pano.setVisible(false);
                  }
                  pano = new google.maps.StreetViewPanorama(document.getElementById('street-view-box'), {
                    navigationControl: true,
                    navigationControlOptions: { style: google.maps.NavigationControlStyle.ANDROID },
                    enableCloseButton: false,
                    addressControl: false,
                    linksControl: false
                  });

                  var pin = new google.maps.MVCObject();
                  pin.set('position', marker.getPosition());
                  pano.bindTo('position', pin);
                  pano.setVisible(true);
                });

                // hides street view box when info window is closed
                google.maps.event.addListener(infoWindow, 'closeclick', function () {
                  pano.unbind('position');
                  pano.setVisible(false);
                  pano = null;
                });
              }
            })(marker, i));
          }

          // closes info window when user clicks marker again
          google.maps.event.addListener(map, 'click', function() {
            infoWindow.close();
          });

          // sets markers on map
          for (var i = 0; i < markers.length; i++) {
            console.log('<-- total # of meters');
            markers[i].setMap(map);
          }

          /* ---------- SEARCH BAR ---------- */
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
                console.log('Returned place contains no geometry');
                return;
              }
              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport); // only geocodes have viewport
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map.fitBounds(bounds);
          });

          /* ---------- MARKER CLUSTERER ---------- */
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
