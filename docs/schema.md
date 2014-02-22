/*
note that:
    * Queries return only top level documents so far as I can tell.
    * Collections can have  documents of differnt /Types/ tell them apart with $exists querys.
    * It is rare to not want the whole document at once when dealing with characters.
    * It's easy to deal with flatter structures.
*/

amanuensis.org/%campaign%/%system.html%


seperate campaigns get their own collection in mongo. 
They should be heavyweight and isolated.
%campaign% 

inside each campaign as collections or documents have:


campaign_name: 'Harpers of Golarion',
system: 'pathfinder',
system_opts: {
    strict: "3pp",
    //...
}


// characters
 
{
     name: "Grobbins",
     schema:"pf_character",
     
     "Strength":{
         "base": 10
     },
     
     
     // Example set of mods. The data will not look like this.
     AC:{
         "Base":10 //should be stored in module
         "Deflection":1 //from equiptment, should be stored there.
         "Deflection": +cha //From a class ability should be attached to that.
         "Armor":+getarmor().getac() // From equiptment, should be stored there.
         "Dodge": //From feat consult feat for amount
         "Sacred": +Class Levels //from Class ability, also very conditional.
         "doge": +1 //wow     so ac
     },
     
     //distributed modifier schema
     //called nodes here but in d20 refers to levels
     //in GURPS it's a flat list of advantages disadvantages and such.
     nodes[ 
         { //level 0
           // While parsing the character create an array for 
            // each value that appears in a apply-to list 
            // containing references to all the objects that 
            // included it. 
            apply-to: ["Str"]                        
            value: 2 // system specific. d20 would use numbers references and dice expressions
            type: "Racial" // d20 might use this to deal with non-stacking modifiers
                                            
         }
         { //level 1
             apply-to: "levels" // recall that apply-to is just building a list of references. It doesn't have to sum them.
             class: "Fast Ordinary"
             
             nodes[ //parsing checks each object for a nodes property and descends into it.  
                {
                    
                }                     
            ]
         }
     ]
}
    

// equiptment floats around with charecters in the same collection.
{
    // might refer to charecter or object or be null. 
    //This is how the cart owns stuff.
    //2-sided weapons are 2 objects, one owns the other.
    owner: <objectID>,
                     
    quantity: 1,
    name: Vorpal Sword,
    taxon: weapon,
    damage: 1d8, //normally a dice expression
    properties:{
        SNICKER SNACK  //strings or module 
                        //references that game system can expand/link to rules text
    },
    value: <not set here> //if absent should be calculatable from properties.
}
{
    owner: <objectID>,
    quantity: 4,
    
    //Here is a reference that the system understands and can 
    // expand into the rest of an item's properties.
    // This might be done by abusing __proto__
    rules: <>
}

