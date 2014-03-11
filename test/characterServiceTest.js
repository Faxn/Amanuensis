'use strict';

/* jasmine specs for services go here */

describe('AmCharacter', function() {
   module('amanuensis');
   
   var sample_grobbins = {
   name: 'grobbins',
     nodes: [
        [
            {'apply-to': 'Strength', 'value': 10, 'type':'Base'},
            {'apply-to': 'Strength', 'value': -4, 'type':'Racial', 'comment':'Goblin'},
            {'apply-to': 'Dexterity', 'value': 10, 'type':'Base'},
            {'apply-to': 'Dexterity', 'value': 2, 'type':'Racial', 'comment':'Goblin'}
        ]
     ]
   };    
   var sample_kabutojirra = {};
   var sample_hungammera = {};
   
   var AmCharacter = null;
   var version = null;
   it('should load', inject(function(_AmCharacter_, _version_) {
      AmCharacter = _AmCharacter_;
      version = _version_;
   }));
   
   describe('Constructor', function() {
      it('should not be null.', function() {
         console.log(AmCharacter);
         expect(version).toBe(1);
         expect(AmCharacter).not.toBe(null);
      });
   });
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
