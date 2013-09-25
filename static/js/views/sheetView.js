define(['text!templates/charSheet.html', 'js/views/attributeTableView'], function(char_sheet_template, attributeTableView){
    DetailedView = Backbone.View.extend({
        //template : _.template($("#details").html()),

        initialize: function() {
            this.model.fetch()
            //this.listenTo(this.model, 'change', this.render, this);
            this.listenTo(this.model, 'destroy', this.remove, this);
            this.$el=$(this.el)
            
            var template = _.template(char_sheet_template, this.model );
            this.$el.html(template);
            
            //set up views
            var model = this.model;
            this.views = this.views || {}
            //Abilities table
            this.views['#abilities_table'] = new attributeTableView({ 
                el:"#abilities_table", 
                model:this.model,
                attrs: ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'],
                totals: [{name:'Ability', formula: function(attr) {return attr}},
                         {name:'Total', formula: model.getValue },
                         {name:'Mod', formula: model.getMod }],
                bonuses : ['base', 'racial']
            })
            this.views['#skills_table'] = new attributeTableView({
                el:'#skills_table',
                model:this.model,
                attrs: _.map(['Acrobatics', 'Survival', 'Sneak', 'Perception'], function(str){return "skills."+str}),
                totals: [{name: "Skill", formula: function(attr) {return attr.split('.')[1]}}],
                bonuses: ['Class Skill', 'Ranks']
            })
            
            
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
