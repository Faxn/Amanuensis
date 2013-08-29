


Character = Backbone.Model.extend({
    defaults:{
        name:"Error McFileNotFound",
        modifiers:{},
        _id: "-1"
    },
    initialize:function(){
        new CharView( {model : this} );
    }
});
    
CharList = Backbone.Collection.extend({
    url: '/characters',
    model: Character,
    initialize: function(){
        console.log('Collection made');
        
    },
    grab: function(){
        console.log(this.fetch());
    }
});

CharView =  Backbone.View.extend({
    initialize: function() {
        var id = 'char_li_'+this.model.attributes._id;
        this.el = '#' + id
        $("#char_box").append('<div id='+id+' class="a_char" ><\div>');
        this.$el = $(this.el);
        this.render();
        //this.$el.bind("click", this.clickQuack)
        this.delegateEvents()
    },
    render: function() {
        var template = _.template($("#char_template").html(), this.model.attributes );
        this.$el.html(template);
    },
    events: {
        "click" : "clickQuack"
    },
    clickQuack:function(){
        //app_router.navigate('sheet'+this.el);
        window.location.hash="sheet/"+this.model.attributes._id
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
        var aList = new CharList();
        aList.grab(); //this can be moved into the CharList's init
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
