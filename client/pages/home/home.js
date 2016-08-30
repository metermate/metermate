angular
  .module('metermate.home', [])
  .controller('HomeCtrl', function($scope, $location) {
    $scope.testing = 'Home is connected'; //Change or remove this; This is to check that the route is working;
    $scope.searchLocation = function() {
      $location.path('/map');
    };
  });
