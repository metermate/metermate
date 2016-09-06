angular
  .module('metermate.home', [])
  .controller('HomeCtrl', function($scope, $location, FindCurrentLocation) {
    var input = document.getElementById('homeInput');
    var searchBox = new google.maps.places.SearchBox(input);
    $scope.searchLocation = function(coordinates) {
      FindCurrentLocation.setLocation();
      $location.path('/map');
    };
  });
