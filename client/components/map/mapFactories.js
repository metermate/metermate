angular
  .module('metermate.map')
  .factory('Map', function($http) {
    return {
      getMeterData: getMeterData
    };

    function getMeterData(param) {
      return $http({
        method: 'GET',
        url: '/api/meters/latest-data',
        params: {
          swLat: param.swLat,
          swLng: param.swLng,
          neLat: param.neLat,
          neLng: param.neLng
        }
      })
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    };
  });
  .factory('Geolocation', function(){
    return {
      centerMap: centerMap
    };

    function centerMap(map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos); // centers map on current location
          var currentLocationPin = new google.maps.Marker({ // creates a pin at current location
            position: new google.maps.LatLng(pos.lat, pos.lng), // sets position prop to geolocation
            animation: google.maps.Animation.DROP
          });
          currentLocationPin.setMap(map); // drops a pin on your current location
        });
      } else {
        error('Geolocation is not supported');
      }
    };
  });
