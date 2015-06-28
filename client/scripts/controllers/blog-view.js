'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogViewCtrl
 * @description
 * # BlogViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('BlogViewCtrl', function($scope, $route, $routeParams, Blog, Comments) {
        $scope.viewBlog = true;
        // get blog content and title
        $scope.blog = Blog.one($routeParams.id).get().$object;
    });

 