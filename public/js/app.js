

amanuensis = angular.module("Amanuensis", ['ngResource']);

amanuensis.controller("mainController", function($scope, $http, $resource){
	
	$scope.currentCharacterId = 111111111111;
	$scope.character = {name:'not', text:'loaded'};
	
	var CharacterResource = $resource('/character/:id', {id:'@id'});
	
	var characters = [
		{name:'Grobbins', text:"has a dagger"},
		{name:'Ragnar', text:"has a club"},
		{name:'Malthar', text:"Is a bear"}
	]
	
	$scope.$watch('currentCharacterId', function(newValue){
		console.log("get character: "+newValue);
		if(newValue.length >= 12){
			$scope.character = CharacterResource.get({id:newValue});
		}
		//$scope.character = characters[newValue];
	});
	
	$scope.dump = function(){
		console.log($scope.character);
	};
	
	
});

amanuensis.directive('amCharacterChooser', function(){
	dir = {
		template:"<input ng-model='currentCharacterId'></input><br> \
				  <button ng-click='character.$save()'>Save</button> <br>\
				  <button ng-click='dump()'>logDump</button>",
		restrict:'E',
	}
	
	return dir;
});

amanuensis.directive("amCharacterSheet", function(){
	
	dir = {
		template : "<input type=text ng-model='character.name'></input>:<br>  <input type=text ng-model='character.text'></input>",
		restrict:'E',
		
	}
	return dir;
	
});

/**/
