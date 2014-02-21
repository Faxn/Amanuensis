
define(['js/models/character'], function(Character){
    
    var Characters = Backbone.Collection.extend({
        url: '/characters',
        model: Character,
        initialize: function(){
            this.grab()
        },
        grab: function(){
            //this.fetch()
            //console.log("fetched: " + this);
        }
    });
    return Characters

})
