define([], function(){
    var SEP = '_' // Seperator for inside DOM ids.
    var Character = Backbone.Model.extend({
        urlRoot: '/characters',
        defaults:{
            name:"Error McFileNotFound",
            modifiers:{},
            _id: "-1",
        },
        initialize:function(){
            
        },
        getValue: function(attribute){
            if(!this.has(attribute)) {
                return -1
            }
            var value = this.get(attribute)
            var value = this.attributes[attribute]
            if( typeof value != 'object'){
                return value
            } else {
                var sum = 0
                $.each(value, function(i, v){
                    if (!isNaN(v)) sum += v
                })
                return sum
            }
        },
        setBonus: function(attribute, bonus, value){
            if(typeof this.get(attribute) != 'object'){
                this.set(attribute, {} ) 
            } 
            var bonuses = this.get(attribute)
            bonuses[bonus]=value 
            /* ugly workaround. As of backbone 1.0.0 set won't 
            detect a change to an object because it's passed as a 
            reference, and the reference hasn't changed. So we are 
            going to remove it, but supress the change event, then 
            adding it will fire a change event.
             */
            this.unset(attribute, ['silent'])   
            this.set(attribute, bonuses)
            this.save()
        },
        getBonuses: function(attributes){
            if(typeof attributes != 'object'){
                attributes = [attributes]
            }
            var bonuses = []
            _.each(attributes, function(e,i,o){
                var attr = this.get(e)
                if(typeof attr == 'object'){
                    _.each(attr,function(val, bon){
                        if(bonuses.indexOf(bon) == -1){
                            bonuses.push(bon)
                        }
                    })
                }
            }, this)
            return bonuses
        },
        getId: function(attribute, modifier, action){
            //lump the Id and any arguments into a list then Join them with sep.
            //works for any number of paramaters provided above
            return ([this.get('_id')].concat(Array.slice(arguments))).join(SEP)
        },
        getById: function(domId){
            domId = domId.split(SEP)
            if(domID[0] !== this.get('_id')){
                throw "Tried to a property of " + domId[0] + 
                'from '+this.get('_id')
            }
            var ret =  this.get(domId[1])
            if(domId[2]) ret=dret[domId[2]]
            return ret
        }
        
    });

    return Character
})
