	'use strict';

	/**
	 * @ngdoc function
	 * @name clientApp.controller:BlogCtrl
	 * @description
	 * # BlogCtrl
	 * Controller of the clientApp
	 */
	angular.module('clientApp')
	  .controller('BlogCtrl', function ($scope, Blog) {	  	  
		    $scope.pageSize = 5;
		    $scope.currentPage = 1;	
		    $scope.numLimit=350;
		    $scope.recentPostTextLimit = 100;
		    $scope.recentPostPageSize = 3;
		  	$scope.blogs = Blog.getList().$object;
		  });
