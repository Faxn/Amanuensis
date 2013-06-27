if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
    //var dep = require('dependency');

return {


/**
 * Set of functions to process the modifiers and xpcs between 
 *  redable forms and the database format.
 * */
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
            if(typeof merged_mods[stat][i].value != number){
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
