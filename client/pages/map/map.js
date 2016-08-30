angular
  .module('metermate.map', [])
  .controller('MapCtrl', function($scope, $window, Map) {
    var meterData = [];

    $window.onload = function() {
      Map.getMeterData()
        .then(function(data) {
          console.log('Data from getMeterData in MapCtrl: ', data);
          meterData = data;

          var mapOptions = {
            center: new google.maps.LatLng(34.0210418, -118.4922241),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          var markers = [];

          //I created the marker inside the loop without this helper function, so I commented it out for now.
          //we can try to refactor this into it later? --samkim

          // var createMarker = function(meter) {
          //   var marker = new google.maps.Marker({
          //     position: new google.maps.LatLng(meter.latitude, meter.longitude)
          //   });
          //   markers.push(marker);
          // };
          //
          // for (var i = 0; i < meterData.length; i++) {
          //   console.log('meterData item: ', meterData[i]);
          //   createMarker(meterData[i]);
          // }


          var contentString = '<div id="content" style="width:200px;height:200px;"></div>';

          var infowindow = new google.maps.InfoWindow();

          for(var i = 0; i < meterData.length; i++){

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(meterData[i].latitude, meterData[i].longitude),
              id: meterData[i].meter_id,
              area: meterData[i].area,
              active: meterData[i].active,
              street_address: meterData[i].street_address,
              event_type: meterData[i].event_type,
              event_time: meterData[i].event_time
            });

            if(meterData[i].event_type === 'SE'){
              marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            }

            markers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {

              return function (){

                infowindow.setContent('<p> Meter Status: ' + marker.active + '</p>' + '<p> Meter Area: ' + marker.area + '</p>' + '<p> Meter Address: ' + marker.street_address + '</p>' + contentString);
                infowindow.open(map, this);

                var pano = null;
                google.maps.event.addListener(infowindow, 'domready', function () {
                  if (pano != null) {
                    pano.unbind("position");
                    pano.setVisible(false);
                  }
                  pano = new google.maps.StreetViewPanorama(document.getElementById("content"), {
                    navigationControl: true,
                    navigationControlOptions: { style: google.maps.NavigationControlStyle.ANDROID },
                    enableCloseButton: false,
                    addressControl: false,
                    linksControl: false
                  });
                  pano.bindTo("position", marker);
                  pano.setVisible(true);
                });

                google.maps.event.addListener(infowindow, 'closeclick', function () {
                  pano.unbind("position");
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
            markers[i].setMap($scope.map);
          }

          google.maps.event.addDomListener(window, 'load', mapOptions);
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
