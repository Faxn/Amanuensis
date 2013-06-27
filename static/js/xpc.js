if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}


/**
 * Module to process the modifiers and xpcs between 
 *  redable forms and the database format.
 * */
 /*
  Development-wise the plan is to build the process of handling 
  the modifiers as several small testable functions to do the 
  process one step at a time, and to merge them if/when preformance 
  becomes a problem.
  */
  /* FUNCTION TREE
   * what calls what as a part of the whole process.
   * 
   * calc_stats()
   *    merge_mods
   *    calc_simple_stats
   *    calc_variable_stats
   */
define(function(require) {
    //var dep = require('dependency');
return {

/**
 * Ffunction to turn a list of modifiers that apply to one 
 * character into an object in the form {stat:value} that contains the
 * final value of all stats.
 */
calc_stats: function(raw_mods){
    var merged_mods = merge_mods(raw_mods)
    var simple_stats = calc_simple_stats(merged_mods)
    var all_stats = calc_variable_stats(merged_mods, simple_stats)
    return all_stats
},


/**
 * @param raw_mods - an array of modifier objects
 * @return a dictionary in the form 
 *      {stat:array of mods that apply to that stat}.
 */ 
merge_mods: function(raw_mods){
    merged_mods = {}
    for(i  in raw_mods){
        for(stati in raw_mods[i].stat){
            var stat = raw_mods[i].stat[stati]
            if(merged_mods[stat] == null){
                merged_mods[stat] = [raw_mods[i]]
            } else {
                merged_mods[stat].push(raw_mods[i])
            }
        }
    }
    return merged_mods
},


/**
 * @param raw_mods - an array of modifier objects
 * @return a dictionary in the form 
 *      {stat:{type: array of mods that apply to that stat with that type }}.
 */ 
merge_mods_type: function(raw_mods){
    merged_mods = {}
    for(i  in raw_mods){
        for(stati in raw_mods[i].stat){
            var mod = raw_mods[i]
            var stat = mod.stat[stati]
            
            //create stat if it does not exist
            if(merged_mods[stat] == null){
                merged_mods[stat] = {}
            }
            
            //if the mod doesn't have a type call it "" (untyped)
            if(mod.type == null){
                mod.type = ""
            }
            
            //create the list for this type if it does not exist.
            if(merged_mods[stat][mod.type] == null){
                merged_mods[stat][mod.type] = []
            }
            
            //push the mod in to it's proper place.
            merged_mods[stat][mod.type].push(raw_mods[i])
            
        }
    }
    return merged_mods
},

/**
 * @param merged_mods output from merged_mods
 * @return a dictionary in the form {stat:value}
 *      that contains only the stats from merged_mods
 *      that don't have variables in them.
 */
calc_simple_stats: function(merged_mods){
    stats = {}
    for(stat in merged_mods){
        var sum = 0;
        var var_encountered = false;
        for(i in merged_mods[stat]){
            if(typeof merged_mods[stat][i].value != "number"){
                var_encountered = true;
                break;
            }else{
                sum += merged_mods[stat][i].value;
            }
        }
        if(!var_encountered){
            stats[stat] = sum;
        }
    }
    
    return stats
},

/**
 */
calc_variable_stats: function(merged_mods, stats){
},

getStat: function (xpc, stat){
    ret = 0;
    for (i in xpc.modifiers){
        //console.log(xpc.modifiers[i]);
        if(xpc.modifiers[i].stat == stat){
            ret += xpc.modifiers[i].value;
        }
    }
    return ret;
},


}})
