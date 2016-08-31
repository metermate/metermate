angular
  .module('metermate.map', [])
  .controller('mapCtrl', function($scope,$window) {
    var markers = [];
    $scope.defaultLocation = new google.maps.LatLng(34.0210418,-118.4922241);
    $scope.mapType = google.maps.MapTypeId.ROADMAP;
    var locations = [
      {
      meterlat: 34.01633,
      meterlong: -118.49191
      },
      {
      meterlat: 34.01103,
      meterlong: -118.49176
      },
      {
      meterlat: 34.03303,
      meterlong: -118.48035
      },
      {
      meterlat: 34.03224,
      meterlong: -118.47578
      },
      {
      meterlat: 34.02135,
      meterlong: -118.49573
      }
    ] //This is our dummy data, btw.

    var mapProp = {
      center: $scope.defaultLocation,
      zoom: 14,
      mapTypeId: $scope.mapType
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapProp);
    google.maps.event.addDomListener(window, 'load', mapProp);

    var createMarker = function (eachMeter){
      markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(eachMeter.meterlat, eachMeter.meterlong)
      }));
    };

    for(var i=0; i<locations.length;i++){
      createMarker(locations[i]);
    }

    for(var i=0; i<markers.length;i++){
      markers[i].setMap($scope.map);
    }

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    $scope.map.addListener('bounds_changed', function() {
        searchBox.setBounds($scope.map.getBounds());
    });
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
     if (!place.geometry) {
       console.log("Returned place contains no geometry");
       return;
     }

     if (place.geometry.viewport) {
       // Only geocodes have viewport.
       bounds.union(place.geometry.viewport);
     } else {
       bounds.extend(place.geometry.location);
     }
   });
    $scope.map.fitBounds(bounds);
    })


  });
