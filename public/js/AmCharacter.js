'use strict';

angular.module('amanuensis.character', [])

/**
 * 
 */
.factory('AmCharacter', [function(){
    function  AmCharacter(charData){
        this.charData = charData;
    }
    
    var proto = AmCharacter.prototype;
    
    
    function findMods(node, visited){
       visited = visited || [];
       if( node in visited ) return [];
       visited.push(node);
       
       var mods = [];
       
       if(node['apply-to'] != undefined){
             mods.push(node);
       }
       
       if(node['@@iterator'] != undefined){
          for(var e of node){
            mods = mods.concat(findMods(e, visited));
          }
       }
       
       if(node.mods != undefined){
             mods = mods.concat(findMods(node.mods, visited));
       }
              
       return mods;
    }
    
    proto.getMods = function(){
       return findMods(this.charData);
    }       
    
    /**
     * Returns a list of all the stats that this character has mods for.
     */
    proto.getStats = function (){
       var stats = [];
       
       for(var mod of this.getMods() ){
          //stats.push(mod);
          if(stats.indexOf(mod['apply-to']) < 0 ) {
            stats.push(mod['apply-to']);
          }
       }
       
       return stats;
    }
    
    return AmCharacter;
    
}])
;
