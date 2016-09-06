angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map'])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
<<<<<<< HEAD:client/app/app.js
        templateUrl: '/app/home/homeView.html',
=======
        templateUrl: './app/pages/home/home.html',
>>>>>>> searchBar:client/app/app.js
        controller: 'HomeCtrl'
      })
      .state('map', {
        url: '/map',
<<<<<<< HEAD:client/app/app.js
        templateUrl: '/app/map/mapView.html',
        controller: 'MapCtrl'
      });
=======
        templateUrl: './app/pages/map/map.html',
        controller: 'MapCtrl'
      })
>>>>>>> searchBar:client/app/app.js

    $urlRouterProvider.otherwise('/');
  });
