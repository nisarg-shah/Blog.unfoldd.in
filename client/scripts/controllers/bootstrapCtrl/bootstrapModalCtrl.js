'use strict';

angular.module('clientApp')
.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

 

  $scope.animationsEnabled = true;

  $scope.open = function (blogid) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        message: function () {
          return blogid;
        }
      }
    });

    modalInstance.result.then(function (message) {
      $scope.message = message;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}).controller('ModalInstanceCtrl', function ($scope, $modalInstance,Blog, message) {
  $scope.message = message;
  $scope.ok = function () {
    $scope.blog = Blog.one($scope.message).get().$object;
    $scope.deleteBlog = function() {
      $scope.blog.remove().then(function() {
         $scope.message = 'success';
    });
  };
    $modalInstance.close($scope.message);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});