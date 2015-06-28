'use strict';
 
   angular.module('clientApp')
    //----------------- blog restangular service ------------------------------
  .factory('BlogRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  });
})
.factory('Blog', function(BlogRestangular) {
  return BlogRestangular.service('blog');
});