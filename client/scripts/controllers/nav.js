	'use strict';

	/**
	 * @ngdoc function
	 * @name clientApp.controller:NavCtrl
	 * @description
	 * # NavCtrl
	 * Controller of the clientApp
	 */
	angular.module('clientApp')
	  .controller('NavCtrl',['$scope', '$location', function($scope, $location){

	$scope.isActive = function(destination){
		return destination === $location.path();
	}
}]);
