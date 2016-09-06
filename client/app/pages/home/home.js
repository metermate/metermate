angular
  .module('metermate.home', [])
  .controller('HomeCtrl', function($scope, $location, FindCurrentLocation) {
    var input = document.getElementById('homeInput');
    var searchBox = new google.maps.places.SearchBox(input);
    // map = new google.maps.Map(document.getElementById('map'), {
    //   center: new google.maps.LatLng(34.019325, -118.494809), // sets default center to MKS
    //   zoom: 20,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // });
    $scope.searchLocation = function(coordinates) {
      $location.path('/map');
    };
  });
