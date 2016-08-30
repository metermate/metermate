angular
  .module('metermate.map', [])

  .controller('mapCtrl', function($scope, $window, Map) {
    var meterData = [];

    $window.onload = function() {
      Map.getMeterData()
        .then(function(data) {
          console.log('Data from getMeterData in mapCtrl: ', data);
          meterData = data;

          var mapOptions = {
            center: new google.maps.LatLng(34.0210418, -118.4922241),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          var markers = [];

          var createMarker = function(meter) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(meter.latitude, meter.longitude)
            });
            markers.push(marker);
          };

          for (var i = 0; i < meterData.length; i++) {
            console.log('meterData item: ', meterData[i]);
            createMarker(meterData[i]);
          }

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
