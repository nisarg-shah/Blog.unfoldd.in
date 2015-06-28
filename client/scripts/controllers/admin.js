'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AdminCtrl', function ($scope, Blog, alertService, $translate, dialogs, $route) {  
	    $scope.pageSize = 5;
	    $scope.currentPage = 1;	
		$scope.numLimit=350;
		$scope.blogs = Blog.getList().$object;

	// ---------------------------  alert messages-------------------------------------


        function deleteBlogSuccess(response) {
            console.log(response);
            alertService.add('success', 'Blog was deleted successfully.');
            $route.reload();
        }

        function deleteBlogFail(reason) {
            alertService.add('warning', 'Blog could not be deleted. ' + reason);
            $route.reload();
        }

    //------------------ delete Blog from admin panel ------------------------------

        function deleteBlog(removeBlog) {
            removeBlog.remove()
                .then(deleteBlogSuccess)
                .catch(deleteBlogFail);
        };

        $scope.launchDeleteBlog = function(comentData) {
            $scope.comentData = comentData;
            var dlg = dialogs.create('/dialogs/delete.html', 'deleteDialogCtrl', $scope.comentData, 'sm');
            dlg.result.then(function(data) {
                deleteBlog($scope.comentData);
            });
        };
  })
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('/dialogs/delete.html', '<div class="dialog-header-error"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-trash"> </span> Delete Blog</h4></div></div><div class="modal-body">Are you sure you want to delete this Blog.?<ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ><input type="hidden" class="form-control" ng-model="data._id" ng-keyup="hitEnter($event)" required ></div><div class="modal-footer"><button type="button" class="btn btn-danger" ng-click="cancel()">No</button><button type="button" class="btn btn-info" ng-click="save()" >Yes</button></div>');
    }])
    .controller('deleteDialogCtrl', function($scope, $modalInstance, data) {
        //-- Variables --//

        $scope.data = data;

        //-- Methods --//

        $scope.cancel = function() {
            $modalInstance.dismiss('Canceled');
        }; // end cancel

        $scope.save = function() {
            $modalInstance.close($scope.data);
        }; // end save

        $scope.hitEnter = function(evt) {
            if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.user.name, null) || angular.equals($scope.user.name, '')))
                $scope.save();
        };
    });   // end controller
