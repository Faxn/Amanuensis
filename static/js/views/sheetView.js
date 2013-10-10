define(['text!templates/charSheet.html', 'js/views/attributeTableView', 'js/pathfinder', 'rivets'], 
function(char_sheet_template, attributeTableView, pathfinder, rivets){
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
            var model = this.model
            this.views = this.views || {}
            //Abilities table
            this.views['#abilities_table'] = new attributeTableView({ 
                el:"#abilities_table", 
                model:this.model,
                attrs: ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'],
                totals: [{name:'Ability', formula: function(attr) {return attr}},
                         {name:'Total', formula: model.getValue },
                         {name:'Mod', formula: model.getMod }
                ],
                bonuses : ['base', 'racial']
            })
            this.views['#skills_table'] = new attributeTableView({
                el:'#skills_table',
                model:this.model,
                attrs: pathfinder.skill_model_names,
                totals: [
                    {name: "Skill", formula: function(attr) {return attr.split('.')[1]}},
                    {name: "Check", formula: function(skill_store) {
                        var skill_name = skill_store.split('.')[1]
                        var skill = model.get(skill_store) || {}
                        var total = 0
                        
                        if(pathfinder.skills_by_name[skill_name].trained_only && !skill.Ranks) return 'N/A'
                        var Ability = skill.ability || pathfinder.skills_by_name[skill_name].ability
                        // apply trained bonus
                        total += skill['Class Skill'] && skill.Ranks  ? 3 : 0
                        total += model.getMod(Ability)
                        _.each(skill, function(e, i){
                            if(isNaN(e)) return
                            total += e
                        })
                        
                        return total
                    }},
                    {name:'Ability', formula: function(skill_store){
                        var skill_name = skill_store.split('.')[1]
                        var skill = model.get(skill_store) || {}
                        var Ability = skill.ability || pathfinder.skills_by_name[skill_name].ability
                        return model.getMod(Ability)
                    }}
                ],
                bonuses: ['Class Skill', 'Ranks']
            })
            
            // call in rivets to do the binding.
            this.binder = rivets.bind(this.$el, {char: model})
            
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
