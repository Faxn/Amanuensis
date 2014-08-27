/**
 * AMD module to preform verification and stat derivation on a character.
 * 
 * For use on both client and server sides.
 */

define('character', [], function(){
	
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
       
       if(node.forEach != undefined){
          node.forEach(function(e){
            mods = mods.concat(findMods(e, visited));
          })
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
       
       this.getMods().forEach(function(mod){
          //stats.push(mod);
          if(stats.indexOf(mod['apply-to']) < 0 ) {
            stats.push(mod['apply-to']);
          }
       })
       
       return stats;
    }
    
    /**
     * get the value of a stat.
     */
    proto.get = function(stat){
        var value = 0;
       this.getMods().forEach(function(mod){
            if(mod['apply-to'] == stat){
                value += mod['value'];
            }
       })
       return value;
    }
    
    return AmCharacter;
    
});
