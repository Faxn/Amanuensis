


Character = Backbone.Model.extend({
    defaults:{
        name:"Error McFileNotFound",
        modifiers:{},
        _id: "-1"
    },
    initialize:function(){
        
    }
});
    
Characters = Backbone.Collection.extend({
    url: '/characters',
    model: Character,
    initialize: function(){
        console.log('Collection made');
        this.grab()
    },
    grab: function(){
        //this.fetch()
        //console.log("fetched: " + this);
    }
});

CharList =  Backbone.View.extend({
    initialize: function() {
        this.collection = new Characters();
        this.collection.on("add", this.addCharacter, this)
        this.collection.fetch()
        this.$el = $(this.el)
        this.render();
    },
    render: function() {
        console.log(this.collection)
        console.log(this.collection.length)
        _.each(this.collection, function (char, index, collection){
            console.log("rendering "+ char);
            var template = _.template($("#char_template").html(), char.attributes );
            this.$el.append(template);
        });
    },
    addCharacter: function (char){
        var template = _.template($("#char_template").html(), char.attributes );
        this.$el.append(template);
    },
    events: {
        "click .a_char" : "clickQuack"
    },
    clickQuack:function(event){
        var charDiv = event.currentTarget
        //app_router.navigate('sheet'+this.el);
        window.location.hash="sheet/"+charDiv.id
        //console.log('quack');
        //this.$el.css("background-color", '#' + (0x1000000+Math.random()*0xffffff).toString(16).substr(1,6))
    }
});

DetailedView = Backbone.View.extend({
    //template : _.template($("#details").html()),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.render();
    },
    render: function(){
        //this.$el.html(template, this.model.toJSON());
    },
    events: {
        "keypress .edit"  : "updateOnEnter"
    }
    
});

AppRouter = Backbone.Router.extend({
    routes: {
        ""          :"list",
        "list"      :"list",
        "sheet/:charid"   : "sheet"
    },
    list: function (){
        var aList = new CharList({el:"#char_box"});
    },
    sheet: function(charid){
        $('#char_box').hide(); //hide the char list - should add something to toggle it back
        details = new DetailedView( new Character({id:charid}) ); //charid may or may not be kosher
        console.log(charid);
    }
})



$(document).ready(function() {
    
        
    //initialize router
    var app_router = new AppRouter;
    app_router.on('route:defaultRoute', function(actions) {
        console.log(actions);
    })
    Backbone.history.start();
});
