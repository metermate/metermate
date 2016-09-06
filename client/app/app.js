angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map'])
  .config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/404');

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
  });
