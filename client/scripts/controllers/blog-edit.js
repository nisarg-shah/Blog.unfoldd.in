'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogEditCtrl
 * @description
 * # BlogEditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('BlogEditCtrl', function ($scope, $routeParams, Blog, $location,$route, alertService) {
    $scope.editBlog = true;

    // ---------------  alert messages  -------------

    function updateBlogSuccess(response) {
        console.log(response);
        alertService.add('success', 'Blog was updated successfully.');
        $location.path('/blog/' + $routeParams.id);
    }
    
    function updateBlogFail(reason) {
        alertService.add('warning', 'BLog could not be updated. ' + reason);
        $route.reload();
    }

    $scope.blog = {};
    Blog.one($routeParams.id).get().then(function(blog) {
      $scope.blog = blog;
      $scope.saveBlog = function() {
        $scope.blog.date = new Date();
        $scope.blog.save()
          .then(updateBlogSuccess)
          .catch(updateBlogFail);
      };
    });

});