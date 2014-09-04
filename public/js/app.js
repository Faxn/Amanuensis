

amanuensis = angular.module("Amanuensis", []);

amanuensis.controller("mainController", function($scope){
	
	$scope.currentCharacterId = 0;
	$scope.character = {name:'not', text:'loaded'};
	
	var characters = [
		{name:'Grobbins', text:"has a dagger"},
		{name:'Ragnar', text:"has a club"},
		{name:'Malthar', text:"Is a bear"}
	]
	
	$scope.$watch('currentCharacterId', function(newValue){
		console.log("get character: "+newValue);
		$scope.character = characters[newValue];
	});
	
});

amanuensis.directive('amCharacterChooser', function(){
	dir = {
		template:"<input ng-model='currentCharacterId'></input>",
		restrict:'E',
	}
	
	return dir;
});

amanuensis.directive("amCharacterSheet", function(){
	
	dir = {
		template : "{{character.name}}:<br>  {{character.text}}",
		restrict:'E',
		
	}
	return dir;
	
});

/**/
