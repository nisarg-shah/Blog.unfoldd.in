'use strict';

angular
  .module('clientApp', [
    'ui.bootstrap',
    'ngAnimate',
    'ngMessages',
    'ngRoute',
    'restangular',
    'angular-jwt',
    'angular-storage',
    'textAngular',
    'angular-loading-bar',
    'dialogs.main',
    'pascalprecht.translate'
  ])
  .config(function ($routeProvider, RestangularProvider, jwtInterceptorProvider, $httpProvider) {

    jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('jwt');
  }

    $httpProvider.interceptors.push('jwtInterceptor');

    RestangularProvider.setBaseUrl('http://localhost:3001/');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
      })
      .when('/create/blog', {
        templateUrl: 'views/blog-add.html',
        controller: 'BlogAddCtrl',
        data: {
          requiresLogin: true
        }
      })
      .when('/blog/:id', {
        templateUrl: 'views/blog-view.html',
        controller: 'BlogViewCtrl',
        data: {
          requiresLogin: true
        }
      })
      .when('/blog-view/:id', {
        templateUrl: 'views/blog-view-full.html',
        controller: 'BlogViewCtrl'
      })
      .when('/blog/:id/delete', {
        templateUrl: 'views/blog-delete.html',
        controller: 'BlogDeleteCtrl',
        data: {
          requiresLogin: true
        }
      })
      .when('/blog/:id/edit', {
        templateUrl: 'views/blog-edit.html',
        controller: 'BlogEditCtrl',
        data: {
          requiresLogin: true
        }
      })
      .when('/create-blog', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        data: {
          requiresLogin: true
        }
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        data: {
          requiresLogin: true
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.config(['$httpProvider', function($httpProvider) {
  
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
//----------------- jwt check stored token ------------------------------
  .run(function( $rootScope, $route, $location, store, jwtHelper, $window) {
    $rootScope.$on('$routeChangeStart', function(e, to) {
      if (to.data && to.data.requiresLogin) {
        if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
          e.preventDefault();
          $window.localStorage.removeItem('jwt');
          $rootScope.loggedInUser = null;  
          $location.path('/login');
          $route.reload();
        }
      }
    });
  })
  //----------------- html tags to simple text omiting html tags -----------------
  .filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    };
  });
