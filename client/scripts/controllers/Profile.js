	'use strict';

	
	angular.module('clientApp')
	  .controller('ProfileCtrl', function($scope,  store, jwtHelper){

	  	$scope.jwt = store.get('jwt');
  		$scope.userInfo = $scope.jwt && jwtHelper.decodeToken($scope.jwt);
});	