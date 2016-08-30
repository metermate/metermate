angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map', 'metermate.about', 'metermate.my-meters', 'metermate.profile'])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './pages/home/home.html',
        controller: 'homeCtrl'
      })
      .state('map', {
        url: '/map',
        templateUrl: './pages/map/map.html',
        controller: 'mapCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: './pages/about/about.html',
        controller: 'aboutCtrl'
      })
      .state('my-meters', {
        url: '/my-meters',
        templateUrl: './pages/my-meters/my-meters.html',
        controller: 'myMetersCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: './pages/profile/profile.html',
        controller: 'profileCtrl'
      })
  });
