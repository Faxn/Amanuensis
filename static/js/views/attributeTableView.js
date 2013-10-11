define(['text!templates/attributeTable.html', 'rivets'], function(attribute_table_template_text, rivets){
    var attribute_table_template = _.template(attribute_table_template_text)
    
    rivets.formatters.total = function(attr){
        console.log("totaling: %o", attr)
        tot=0
        _.each(attr, function(e, i, o){
            if(typeof e === 'number')
            tot += e
        })
        return tot
    }
    
    /**
     * @field {Array[String]} attrs - list of attributes that make up the rows of the table.
     * @field {Array[{name:<String>, formula:<function(String)>}]} totals - colums defined by a hard coded formula. the Function in formula is called on the model.
     */
    return Backbone.View.extend({
        constructor: function (param_obj){
            this.attrs = param_obj.attrs || param_obj.attributes || []
            this.totals = param_obj.totals || []
            this.bonuses = param_obj.bonuses || []
            this.columns = this.totals
            _.each(this.bonuses, function(bonus){
            })
            Backbone.View.apply(this, arguments)
            
        },
        initialize: function (){
            var model= this.model
            this.listenTo(this.model, 'change', this.render, this);
        },
        render: function(){
            this.bonuses = this.model.getBonuses(this.attrs, this.bonuses)
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
            var value = isNaN(field.text()) ? field.text() :Number(field.text())
            this.model.setBonus(attribute, bonus, value)
        } 
    })
    
    
})
