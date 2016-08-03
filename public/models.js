'use strict';



require(["amanuensis/character"], function(character) {
       
angular.module('Amanuensis')

/**
 * 
 */
.factory('AmCharacter', [function(){
   return character 
}])

.factory('AmSheet', [function(){
   return {}
}])

});
;
