Char = new Backbone.Model.extend({
    initialize: function(){
        console.log("new Char model made!");
    },
    defaults: function(){
        return {
            name: "Defobbins",
            type: "Character",
            templates: new Array(),
            modifiers: new Array(),
        }
    }
});


CharList = new Backbone.Collection.extend({
    initialize: function(){
        console.log("new CharList collection made");
        //this.sync();
        console.log(this.models);
    },
    url: function(){
        return "192.168.1.116:8080/characters"; //this is how you combine a url with some kind of variable.  I dont remember what the url is supposed to be.
    },
    getAllChars: function(){
        //later
    }
});

theChars = new CharList();

