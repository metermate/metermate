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

          for (var i = 0; i < meterData.length; i++) {
            var defaultMeterIcon = {
              path: 'M-276.6,355.8c-8,0-14.4,6.5-14.4,14.4c0,4.8,2.4,9.1,6,11.7c1.3,10.2,3.9,13.7,3.9,13.7c0,0.4,0.3,0.4,0.6,0.4h2.1v39.3c-1.7,0.1-3.3,0.4-3.3,0.8c0,0.5,2.3,0.9,4.9,0.9c2.6,0,4.9-0.4,4.9-0.9c-0.1-0.4-1.5-0.7-3.5-0.8V396h2.4c0.3,0,0.6-0.1,0.6-0.4c0,0,2.6-3.4,3.9-13.6c3.7-2.6,6.2-6.9,6.2-11.8C-262.3,362.3-268.7,355.9-276.6,355.8zM-275.4,378.8c0,0.8-0.7,1.4-1.5,1.4s-1.5-0.6-1.5-1.4v-5.6c0-0.8,0.7-1.4,1.5-1.4s1.5,0.6,1.5,1.4V378.8zM-268,367.6c-1.2-3.7-4.7-6.6-8.7-6.6c-4.2,0-7.7,2.8-8.7,6.6c-1.1-0.3-2-0.6-2.7-0.9c1.4-5,6-8.7,11.5-8.7c5.4,0,10,3.6,11.4,8.6C-265.9,366.9-266.8,367.2-268,367.6z',
              fillColor: '#FF6666',
              fillOpacity: 0.8,
              scale: 0.65,
              strokeColor: '#425765',
              strokeWeight: 1
            };
            // creates marker for each meter in meterData array
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(meterData[i].latitude, meterData[i].longitude),
              icon: defaultMeterIcon,
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

            // shows green meter icon if meter is available
            if(meterData[i].event_type === 'SE') {
              console.log('<-- # of available meters');
              var greenMeterIcon = defaultMeterIcon;
              greenMeterIcon.fillColor = '#10D492';
              marker.setIcon(greenMeterIcon);
              marker.status = 'Available';
            } else {
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
                  pano.bindTo('position', marker);
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
