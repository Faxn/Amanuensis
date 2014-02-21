define(['js/collections/characters', 'text!templates/charListItem.html', 'rivets'], function(Characters, char_list_item_template, rivets){
    CharList =  Backbone.View.extend({
        initialize: function() {
            this.collection = new Characters();
            this.chars = {}
            this.collection.on("add", this.addCharacter, this)
            this.collection.fetch()
            this.$el = $(this.el)
            
            this.rvView = rivets.bind(this.$el, this.chars)
            console.log(this.rvView)
        },
        addCharacter: function (char){
            var li = _.template(char_list_item_template, char);
            this.chars[char.get('_id')] = char
            this.$el.append(li);
            this.rvView.build()
            this.rvView.bind()
            
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
