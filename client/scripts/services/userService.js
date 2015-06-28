'use strict';
 
   angular.module('clientApp')

 
//----------------- user restangular service ------------------------------
.factory('UsersRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  });
})

.factory('Users', function(UsersRestangular) {
  return UsersRestangular.service('users');
})
.filter('startFrom', function(){
  return function(data , start){
    return data.slice(start);
  }
});
