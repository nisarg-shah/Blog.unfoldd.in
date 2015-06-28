'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:GetCommentCtrl
 * @description
 * # GetCommentCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('GetCommentsCtrl', function($scope, $route, $routeParams, Comments, alertService, $translate, dialogs) {

  //---------------------------  alert messages-------------------------------------
       

        function updateCommentSuccess(response) {
            console.log(response);
            alertService.add('success', 'Comment was added successfully.');
            $route.reload();
        }

        function updateCommentFail(reason) {
            alertService.add('warning', 'Comment could not be added. ' + reason);
            $route.reload();
        }

        function blockCommentSuccess(response) {
            console.log(response);
            alertService.add('success', 'Comment was block successfully.');
        }

        function blockCommentFail(reason) {
            alertService.add('warning', 'Comment could not be block. ' + reason);
        }

        function unblockCommentSuccess(response) {
            console.log(response);
            alertService.add('success', 'Comment was unblock successfully.');
        }

        function unblockCommentFail(reason) {
            alertService.add('warning', 'Comment could not be unblock. ' + reason);
        }

        function deleteCommentSuccess(response) {
            console.log(response);
            alertService.add('success', 'Comment was deleted successfully.');
            $route.reload();
        }

        function deleteCommentFail(reason) {
            alertService.add('warning', 'Comment could not be deleted. ' + reason);
            $route.reload();
        }



        // post comments
        $scope.commentsContent = {
            "blogid": $routeParams.id,
            "date": new Date()
        };
        $scope.addComments = function() {
            Comments.post($scope.commentsContent)
                .then(updateCommentSuccess)
                .catch(updateCommentFail);
        };


        //get comments as per the blog
        $scope.commentsGet = {};
        $scope.commentsGet = Comments.getList("comments", {
            blogid: $routeParams.id
        }).$object;

        //delete comment from admin panel
        function deleteComment(removeComments) {
            removeComments.remove()
                .then(deleteCommentSuccess)
                .catch(deleteCommentFail);
        };

        //Edit comment status to 0 to disable a comment from admin panel
        function blockComment(Commentcontent) {
            Commentcontent.status = '0';
            Commentcontent.put()
                .then(blockCommentSuccess)
                .catch(blockCommentFail);
        };

        //Edit comment status to 1 to enable a comment from admin panel
        function unblockComment(Commentcontent) {
            Commentcontent.status = '1';
            Commentcontent.put()
                .then(unblockCommentSuccess)
                .catch(unblockCommentFail);
        };

        //dialogs

        $scope.launchBlockComment = function(comentData) {
            $scope.comentData = comentData;
            var dlg = dialogs.create('/dialogs/block.html', 'blockDialogCtrl', $scope.comentData, 'sm');
            dlg.result.then(function(data) {
                blockComment($scope.comentData);
            });
        };

        $scope.launchUnBlockComment = function(comentData) {
            $scope.comentData = comentData;
            var dlg = dialogs.create('/dialogs/unblock.html', 'unblockDialogCtrl', $scope.comentData, 'sm');
            dlg.result.then(function(data) {
                unblockComment($scope.comentData);
            });
        };

        $scope.launchDeleteComment = function(comentData) {
            $scope.comentData = comentData;
            var dlg = dialogs.create('/dialogs/delete.html', 'deleteDialogCtrl', $scope.comentData, 'sm');
            dlg.result.then(function(data) {
                deleteComment($scope.comentData);
            });
        };

    })

.run(['$templateCache', function($templateCache) {
        $templateCache.put('/dialogs/block.html', '<div class="dialog-header-warning"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-ban-circle"> </span> Block Comment</h4></div></div><div class="modal-body">Are you sure you want to block this comment.?<ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ><input type="hidden" class="form-control" ng-model="data._id" ng-keyup="hitEnter($event)" required ></div><div class="modal-footer"><button type="button" class="btn btn-danger" ng-click="cancel()">No</button><button type="button" class="btn btn-info" ng-click="save()" >Yes</button></div>');
    }])
    .controller('blockDialogCtrl', function($scope, $modalInstance, data) {
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
    }) // end controller

    .run(['$templateCache', function($templateCache) {
        $templateCache.put('/dialogs/unblock.html', '<div class="dialog-header-wait"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-ok"> </span> UnBlock Comment</h4></div></div><div class="modal-body">Are you sure you want to unblock this comment.?<ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ><input type="hidden" class="form-control" ng-model="data._id" ng-keyup="hitEnter($event)" required ></div><div class="modal-footer"><button type="button" class="btn btn-danger" ng-click="cancel()">No</button><button type="button" class="btn btn-info" ng-click="save()" >Yes</button></div>');
    }])
    .controller('unblockDialogCtrl', function($scope, $modalInstance, data) {
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
    })  // end controller


    .run(['$templateCache', function($templateCache) {
        $templateCache.put('/dialogs/delete.html', '<div class="dialog-header-error"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-trash"> </span> Delete Comment</h4></div></div><div class="modal-body">Are you sure you want to delete this comment.?<ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ><input type="hidden" class="form-control" ng-model="data._id" ng-keyup="hitEnter($event)" required ></div><div class="modal-footer"><button type="button" class="btn btn-danger" ng-click="cancel()">No</button><button type="button" class="btn btn-info" ng-click="save()" >Yes</button></div>');
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
