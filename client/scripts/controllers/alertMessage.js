'use strict';

angular.module('clientApp')
  .controller('GetMessageCtrl', function ($scope, alertService) {
  	$scope.alerts = alertService.get();
  	});