


var testCharacters = [

//Grobbins
{
   'character':{
      name: 'grobbins',
      mods: [
           { // level 0
              mods:[
                  {'apply-to': 'Strength', 'value': 10, 'type':'Base'},
                  {'apply-to': 'Strength', 'value': -4, 'type':'Racial', 'comment':'Goblin'},
                  {'apply-to': 'Dexterity', 'value': 10, 'type':'Base'},
                  {'apply-to': 'Dexterity', 'value': 2, 'type':'Racial', 'comment':'Goblin'}
              ]
           }
      ]
   },
   'stats': ['Strength', 'Dexterity'],
   'statValues': {'Strength': 6, 'Dexterity': 12}
},

{
   'character':{
      name: 'kabutojirra',
      mods: [
           
           [ //level 0 
            {'apply-to': 'Strength', 'value': 10, 'type':'Base'},
            {'apply-to': 'Strength', 'value': 8, 'type':'Racial', 'comment':'Kaiju'},
            {'apply-to': 'Dexterity', 'value': 10, 'type':'Base'},
            {'apply-to': 'Constitution', 'value': 10, 'type':'Base', },
            {'apply-to': 'Constitution', 'value': 10, 'type':'Racial', 'comment':'Kaiju'},
            {'apply-to': 'strBon', 'value': "Strength-10/2"}
           ]
           
      ]
   },
   'stats': ['Strength', 'Dexterity', 'Constitution', 'strBon'],
   'statValues': {'Strength':18, 'Dexterity':10, 'Constitution':20}
}

//hungammera = {};
]

/**
 * coppy grobbins mods into an expected mods list.
 */
testCharacters[0].mods = [];
testCharacters[0].mods.push(testCharacters[0].character.mods[0].mods[0]);
testCharacters[0].mods.push(testCharacters[0].character.mods[0].mods[1]);
testCharacters[0].mods.push(testCharacters[0].character.mods[0].mods[2]);
testCharacters[0].mods.push(testCharacters[0].character.mods[0].mods[3]);

