require([ 'js/models/character', 'js/views/charList', 'js/views/sheetView'], function(Character, CharList, DetailedView){
    

    





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
