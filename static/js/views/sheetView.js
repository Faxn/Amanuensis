define(['text!templates/charSheet.html', 'js/views/attributeTableView'], function(char_sheet_template, attributeTableView){
    DetailedView = Backbone.View.extend({
        //template : _.template($("#details").html()),

        initialize: function() {
            //this.listenTo(this.model, 'change', this.render, this);
            this.listenTo(this.model, 'destroy', this.remove, this);
            this.$el=$(this.el)
            
            var template = _.template(char_sheet_template, this.model );
            this.$el.html(template);
            
            this.views = this.views || {}
            this.views['#abilities_table'] = new attributeTableView({ 
                el:"#abilities_table", 
                model:this.model
            })
            this.model.fetch()
        },
        render: function(){
            this.model.fetch()
            _.each(this.views, function(v,i){
                v.render();
            })
        },
        events: {
            "keypress .edit"  : "updateOnEnter",
            "click #manual_mod_submit" : 'manualMod'
        },
        manualMod: function(event){
            var modname = $('#mm_mod').val()
            this.model.setBonus('Str', modname, 0)
            this.model.save()
            this.render()
        }
        
    });
    return DetailedView
})
