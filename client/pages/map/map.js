angular
  .module('metermate.map', [])
  .controller('mapCtrl', function($scope, $window) {
    var markers = [];
    $scope.defaultLocation = new google.maps.LatLng(34.0210418,-118.4922241);
    $scope.mapType = google.maps.MapTypeId.ROADMAP;
    var locations = [
      {
      meterlat: 34.01633,
      meterlong: -118.49191,
      name: 'broadway1',
      active: 'active',
      area: '3rd street promenade area',
      street_address: '12 broadway'
      },
      {
      meterlat: 34.01103,
      meterlong: -118.49176,
      name: 'broadway2',
      active: 'active',
      area: 'near ROC',
      street_address: '123 broadway'

      },
      {
      meterlat: 34.03303,
      meterlong: -118.48035,
      name: 'broadway3',
      active: 'inactive',
      area: 'downtown',
      street_address: '1234 broadway'

      },
      {
      meterlat: 34.03224,
      meterlong: -118.47578,
      name: 'broadway4',
      active: 'active',
      area: 'the pier',
      street_address: '12345 broadway'

      },
      {
      meterlat: 34.02135,
      meterlong: -118.49573,
      name: 'broadway5',
      active: 'inactive',
      area: 'next to mendocino',
      street_address: '123456 broadway'

      }
    ] //This is our dummy data, btw.


    var mapProp = {
      center: $scope.defaultLocation,
      zoom: 14,
      mapTypeId: $scope.mapType
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapProp);
    google.maps.event.addDomListener(window, 'load', mapProp);

    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });

    var contentString = '<div id="content" style="width:250px;height:300px;"></div>';

    for(var i=0; i<locations.length;i++){
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].meterlat, locations[i].meterlong),
        map: map,
        name: locations[i].name,
        area: locations[i].area,
        active: locations[i].active,
        street_address: locations[i].street_address
      });

      markers.push(marker);

      var infowindow = new google.maps.InfoWindow({
        content: '<p> Meter Status: ' + marker.active + '</p>' + '<p> Meter Area: ' + marker.area + '</p>' + '<p> Meter Address: ' + marker.street_address + '</p>' + contentString
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.open(map, marker);

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

    for(var i=0; i<markers.length;i++){
      markers[i].setMap($scope.map);
    }
  });
