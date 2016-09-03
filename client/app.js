angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map', 'metermate.about'])

  .config(function($stateProvider,
    $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
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
      })
      .state('about', {
        url: '/about',
        templateUrl: './pages/about/about.html',
        controller: 'AboutCtrl'
      })

  });
