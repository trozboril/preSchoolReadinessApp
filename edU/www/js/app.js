// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('eduApp', ['ionic', 'eduApp.controllers', 'eduApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

//load main page

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
  })
    //guardian page
    .state('guardian', {
      url: '/guardian',
      templateUrl: 'templates/guardian.html',
      controller: 'GuardianController'
  })
    //teacher page (can only put)
    .state('teacher', {
      url: '/teacher',
      templateUrl: 'templates/teacher.html',
      controller: 'TeacherController'
  })
    //admin page (all creation happens here)
    .state('admin', {
      url: '/admin',
      templateUrl: 'templates/admin.html',
      controller: 'RegisterController'
  });
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

  function routeChange($rootScope, $location, $window, authService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    // if route us restricted and no token is present
    if(next.restricted && !$window.localStorage.getItem('token')) {
      $location.path('/login');
    }
    // if token and prevent logging in is true
    if(next.preventLoggedIn && $window.localStorage.getItem('token')) {
      $location.path('/');
    }
  });
  }


});