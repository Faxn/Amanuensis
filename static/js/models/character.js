define([], function(){

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
        }
    });

    return Character
})
