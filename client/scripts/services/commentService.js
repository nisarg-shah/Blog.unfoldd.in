'use strict';
 
angular.module('clientApp')
	//----------------- Comments restangular service ------------------------------
	.factory('CommentsRestangular', function(Restangular) {
	  return Restangular.withConfig(function(RestangularConfigurer) {
	    RestangularConfigurer.setRestangularFields({
	      id: '_id'
	    });
	  });
	})
	.factory('Comments', function(CommentsRestangular) {
	  return CommentsRestangular.service('comments');
	});