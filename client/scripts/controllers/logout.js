

'use strict';


angular.module('clientApp')
  .controller( 'LogOutCtrl', function SignupController($rootScope, $scope, $http, store, $location, $window) {
  	$scope.logOut = function(){
  		$window.localStorage.removeItem('jwt');
      	$rootScope.loggedInUser = null;  
  		$location.path('/login');
  	}
  });
