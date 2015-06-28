'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogDeleteCtrl
 * @description
 * # BlogDeleteCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('BlogDeleteCtrl', function ($scope, $routeParams, Blog, $location) {
  $scope.blog = Blog.one($routeParams.id).get().$object;
  $scope.deleteBlog = function() {
    $scope.blog.remove().then(function() {
      $location.path('/create-blog');
    });
  };
  $scope.back = function() {
    $location.path('/blog/' + $routeParams.id);
  };
});