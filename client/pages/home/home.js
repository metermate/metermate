angular.module('metermate.home', [])
.controller('homeCtrl', function($scope, $location) {
  $scope.loading = false;
  $scope.searchLocation = function() {
    $location.path('/map');
    $scope.loading = true;
  };

});
