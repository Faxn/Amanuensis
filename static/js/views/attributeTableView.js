define(['text!templates/attributeTable.html'], function(attribute_table_template_text){
    var attribute_table_template = _.template(attribute_table_template_text)
    
    return Backbone.View.extend({
        initialize: function (){
            var model= this.model
            this.listenTo(this.model, 'change', this.render, this);
            this.attrs = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha']
            this.totals = [{name:'Ability', formula: function(attr) {return attr}},
                           {name:'Total', formula: function(attr){return model.getValue(attr)}},
                           {name:'Mod', formula:function(attr){return Math.floor(model.getValue(attr)/2-5) }}]
            
            
            
        },
        render: function(){
            this.bonuses = this.model.getBonuses(this.attrs)
            this.$el.html(attribute_table_template(this))
        },
        events:{
            "dblclick .mod_field": 'editMod',
            "blur .mod_field": 'saveMod' 
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
    })
    
    
})
