angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './pages/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('map', {
        url: '/map',
        templateUrl: './pages/map/map.html',
        controller: 'MapCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });
