angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map'])

  .config(function($stateProvider,
    $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './app/pages/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('map', {
        url: '/map',
        templateUrl: './app/pages/map/map.html',
        controller: 'MapCtrl'
      })

  });
