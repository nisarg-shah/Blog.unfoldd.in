'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogAddCtrl
 * @description
 * # BlogAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')

  .controller('BlogAddCtrl', function ($scope ,Blog, $location, alertService ) {

 //---------------------------  alert messages-------------------------------------
       

        function addBlogSuccess(response) {
            console.log(response);
            alertService.add('success', 'Blog was added successfully.');
            $location.path('/create-blog');
        }

        function addBlogFail(reason) {
            alertService.add('warning', 'Blog could not be added. ' + reason);
            $route.reload();
        }

  $scope.blog = {"date": new Date()};
  $scope.saveBlog = function() {
    Blog.post($scope.blog)
    	.then(addBlogSuccess)
    		.catch(addBlogFail);
  };
});