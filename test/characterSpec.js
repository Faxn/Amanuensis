'use strict';

/* jasmine specs for services go here */

//describe


describe('AmCharacter', function() {
   beforeEach(angular.mock.module('amanuensis.character'));
     
   var AmCharacter = null;
   
   
   describe('the module', function() {
      it('should load', inject(function(_AmCharacter_) {
         AmCharacter = _AmCharacter_;
      }));
      
      it('should be a constructor.', function() {
         expect(AmCharacter).not.toBe(null);
         expect(typeof AmCharacter).toBe('function');
      });
   });
   
   //because of how jasmine executes we need to build a function for the
   //suite of tests that will run on each of the test characters.
   function testCharacter(dataSet){
   describe(dataSet['character']['name'], function (){
      
      var character;
      it('should construct without error', function(){
         character = new AmCharacter(dataSet['character']);
         expect(character).not.toBe(undefined);
      });
      
      if(dataSet['mods'] != undefined){
         it('should be able to extract the mods from the structured character', function(){
            var expectedMods = dataSet['mods'];
            var actualMods = character.getMods();
            
            expect(actualMods.length).toBe(expectedMods.length);
            expect(actualMods.length).not.toBe(0);
            expectedMods.forEach(function(mod) {
               expect(actualMods).toContain(mod);
            })
         });
      }

      
      if(dataSet['stats'] != undefined){
         it('should figure out what stats are on the character.', function(){
            var expectedStats = dataSet['stats'];
            var actualStats = character.getStats();
            
            expect(actualStats.length).toBe(expectedStats.length);
            expectedStats.forEach(function(stat) {
               expect(actualStats).toContain(stat);
               if(dataSet['statValues'] != null && dataSet['statValues'][stat] != undefined){
                  expect(character.get(stat)).toBe(dataSet['statValues'][stat])
               }
            })
         });
      }
      
      
   })
   }
   
   //testCharacters defined in characterProvider.js
   testCharacters.forEach(function(dataSet){ 
      testCharacter(dataSet);
   })
   
   
});
/*
module('amanuensis');
describe('service', inject(function(AmCharacter) {
    
//    var amanuensis = angular.module('amanuensis');
//    var charService = amanuensis.factory('characterService');
//    var inj = angular.injector(['ng', 'amanuensis']);
//      var AmCharacter = angular.injector.get("AmCharacter")
    
    
  
    
    describe('Character Service', function() {
        console.log(AmCharacter)
        it('Should be a constructor', function(version) {
          expect(AmCharacter).not.toBe('undefined');  
          expect(charService.nonce).toBe(2134);
          expect(typeof charService.Character === 'function').toBe(true);
        });

        it('should construct all of the sample characters', function(){
            charService(sample_grobbins);
        });
    });
    
    describe('Character objects', function(){
    });
}));
*/
