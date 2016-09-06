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
