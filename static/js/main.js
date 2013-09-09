require([ 'js/models/character', 'js/collections/characters'], function(Character, Characters){
    

    

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

DetailedView = Backbone.View.extend({
    //template : _.template($("#details").html()),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render, this);
        this.listenTo(this.model, 'destroy', this.remove, this);
        this.$el=$(this.el)
        this.render();
    },
    render: function(){
        this.model.fetch()
        var template = _.template($("#char_sheet_template").html(), this.model );
        this.$el.html(template);
    },
    events: {
        "keypress .edit"  : "updateOnEnter",
        "click #manual_mod_submit" : 'manualMod'
    },
    manualMod: function(event){
        this.model.set($('#mm_mod').val(), $('#mm_value').val())
        console.log(this.model)
        this.model.save()
        this.render()
    }
    
});

AppRouter = Backbone.Router.extend({
    routes: {
        ""          :"list",
        "list"      :"list",
        "sheet/:charid"   : "sheet",
        "raw/:charid"   : "raw"
    },
    list: function (){
    },
    sheet: function(charid){
        details = new DetailedView({model:new Character({id:charid}), el:"#char_sheet"}); //charid may or may not be kosher
    },
    raw: function (charid) {
        var char = (new Character({id:charid}))
        char.fetch({success: function(){
            $("#char_sheet").html( JSON.stringify(char) )
            console.log(char)
        }})
        
    }
})



$(document).ready(function() {
    if(!this.aList){
            this.aList = new CharList({el:"#char_box"});
    }
        
    //initialize router
    var app_router = new AppRouter;
    app_router.on('route:defaultRoute', function(actions) {
        console.log(actions);
    })
    Backbone.history.start();
    
    
});


})
