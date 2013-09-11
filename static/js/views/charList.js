define(['js/collections/characters'], function(Characters){
    CharList =  Backbone.View.extend({
        initialize: function() {
            this.collection = new Characters();
            this.collection.on("add", this.addCharacter, this)
            this.collection.fetch()
            this.$el = $(this.el)
        },
        addCharacter: function (char){
            var template = _.template($("#char_template").html(), char);
            this.$el.append(template);
        },
        events: {
            "click .a_char" : "clickChar"
        },
        clickChar:function(event){
            var charDiv = event.currentTarget
            //app_router.navigate('sheet'+this.el);
            window.location.hash="sheet/"+charDiv.id
            //console.log('quack');
            //this.$el.css("background-color", '#' + (0x1000000+Math.random()*0xffffff).toString(16).substr(1,6))
        }
    });
    return CharList
})
