angular
  .module('metermate', ['ui.router', 'metermate.home', 'metermate.map', 'metermate.about', 'metermate.my-meters', 'metermate.profile'])

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
      })
      .state('about', {
        url: '/about',
        templateUrl: './pages/about/about.html',
        controller: 'AboutCtrl'
      })
      .state('my-meters', {
        url: '/my-meters',
        templateUrl: './pages/my-meters/my-meters.html',
        controller: 'MyMetersCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: './pages/profile/profile.html',
        controller: 'ProfileCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });
