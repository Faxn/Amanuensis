define([], function(){
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
    return DetailedView
})
