'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller( 'SignupCtrl', function SignupController($rootScope, $scope, $http, store, $location, alertService) {

//------------------ Error messages -------------------------

    function signUpSuccess() {
        alertService.add('success', 'Account created successfully.');
        $location.path('/create-blog');
    }

    function signUpFail(reason) {
        alertService.add('warning', 'Error occured while Signing Up. ' + reason);
    }

  $scope.user = {};
  $scope.createUser = function() {
    $http({
      url: 'http://localhost:3001/signup',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {
        store.set('jwt', response.data.id_token);
        $rootScope.loggedInUser = response.data.username;    
        signUpSuccess();
    }, function(error) {
      signUpFail(error.data);
    });
  }

});

