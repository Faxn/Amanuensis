define([], function (){
    pf = {
        skills: [
            {name:'Acrobatics', ability:'Dex', trained_only:false},
            {name:'Appraise', ability:'Int', trained_only:false},
            {name:'Autohypnosis', ability:'Wis', trained_only:true},
            {name:'Bluff', ability:'Cha', trained_only:false},
            {name:'Climb', ability:'Str', trained_only:false},
            {name:'Craft1', ability:'Int', trained_only:false},
            {name:'Craft2', ability:'Int', trained_only:false},
            {name:'Craft3', ability:'Int', trained_only:false},
            {name:'Diplomacy', ability:'Cha', trained_only:false},
            {name:'Disable Device', ability:'Dex', trained_only:true},
            {name:'Disguise', ability:'Dex', trained_only:false},
            {name:'Escape Artist', ability:'Dex', trained_only:false},
            {name:'Fly', ability:'Dex', trained_only:false},
            {name:'Handle Animal', ability:'Cha', trained_only:true},
            {name:'Heal', ability:'Wis', trained_only:false},
            {name:'Intimidate', ability:'Cha', trained_only:false},
            {name:'Knowledge(Arcana)', ability:'Int', trained_only:true},
            {name:'Knowledge(Dungeoneering)', ability:'Int', trained_only:true},
            {name:'Knowledge(Engineering)', ability:'Int', trained_only:true},
            {name:'Knowledge(Geography)', ability:'Int', trained_only:true},
            {name:'Knowledge(History)', ability:'Int', trained_only:true},
            {name:'Knowledge(Local)', ability:'Int', trained_only:true},
            {name:'Knowledge(Nature)', ability:'Int', trained_only:true},
            {name:'Knowledge(Nobility)', ability:'Int', trained_only:true},
            {name:'Knowledge(Planes)', ability:'Int', trained_only:true},
            {name:'Knowledge(Religon)', ability:'Int', trained_only:true},
            {name:'Lingustics', ability:'Int', trained_only:true},
            {name:'Perception', ability:'Wis', trained_only:false},
            {name:'Perform1', ability:'Cha', trained_only:false},
            {name:'Perform2', ability:'Cha', trained_only:false},
            {name:'Profession1', ability:'Wis', trained_only:true},
            {name:'Profession2', ability:'Wis', trained_only:true},
            {name:'Ride', ability:'Dex', trained_only:false},
            {name:'Sense Motive', ability:'Wis', trained_only:false},
            {name:'Slight of hand', ability:'Dex', trained_only:true},
            {name:'Spellcraft', ability:'Int', trained_only:true},
            {name:'Stealth', ability:'Dex', trained_only:false},
            {name:'Survival', ability:'Wis', trained_only:false},
            {name:'Swim', ability:'Str', trained_only:false},
            {name:'Use magic device', ability:'Cha', trained_only:true}
        ],
    }
    
    pf.skills_by_name = {}    //hash for referencing the skills by name.
    pf.skill_model_names = [] //for the attrs property of the skills view.
    _.each(pf.skills, function (skill, i, o) {
        pf.skills_by_name[skill.name] = skill
        pf.skill_model_names[i] = "skills."+skill.name
    })
    return pf
})
