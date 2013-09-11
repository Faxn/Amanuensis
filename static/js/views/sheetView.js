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
            "click #manual_mod_submit" : 'manualMod',
            "dblclick .mod_field": 'editMod',
            "blur .mod_field": 'saveMod'
        },
        manualMod: function(event){
            var modname = $('#mm_mod').val()
            this.model.setBonus('Str', modname, 0)
            this.model.save()
            this.render()
        },
        editMod: function(event) {
            var field = event.currentTarget
            $(field).attr('contenteditable', true)
            // TODO: This is Obselete in HTML5 according to 
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#focus%28%29
            // but the modern method is a mystery.
            $(field).focus()
        },
        saveMod: function(event){
            var field = $(event.currentTarget)
            field.attr('contenteditable', false)
            var attribute = field.attr('data-attribute')
            var bonus = field.attr('data-bonus')
            var value = Number(field.text())
            this.model.setBonus(attribute, bonus, value)
        }
    });
    return DetailedView
})
