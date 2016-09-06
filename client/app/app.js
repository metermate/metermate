angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map'])
    .config(function ($urlRouterProvider, $stateProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/app/home/homeView.html',
          controller: 'HomeCtrl'
        })
        .state('map', {
          url: '/map',
          templateUrl: '/app/map/mapView.html',
          controller: 'MapCtrl'
        });

      $urlRouterProvider.otherwise('/');
    }
);
