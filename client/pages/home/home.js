angular
  .module('metermate.home', [])
  .controller('homeCtrl', function($scope, $location) {
    $scope.testing = 'Home is connected'; //Change or remove this; This is to check that the route is working;
    $scope.searchLocation = function() {
      $location.path('/map');
    };
  });
