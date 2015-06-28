'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller( 'LoginCtrl', function LoginController($rootScope, $scope, $http, store, $location, alertService) {

//------------------ Error messages -------------------------

    function logInSuccess() {
        $location.path('/create-blog');
    }

    function logInFail(reason) {
        alertService.add('warning', 'Error occured while Logging in. ' + reason);
    }

  $scope.user = {};

  $scope.login = function() {
    $http({
      url: 'http://localhost:3001/login',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {
        store.set('jwt', response.data.id_token);
        $rootScope.loggedInUser = response.data.username;    
        logInSuccess();
    }, function(error) {
      logInFail(error.data);
    });
  }

});
