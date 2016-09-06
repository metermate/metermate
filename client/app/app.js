angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map'])
  .config(config);

function config($urlRouterProvider, $stateProvider) {
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
