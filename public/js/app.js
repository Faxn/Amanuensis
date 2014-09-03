/**

amanuensis = angular.module("Amanuensis", []);

amanuensis.controller("mainController", function($scope){
	
	$scope.currentCharacterId = 1;
	
});

amanuensis.controller("characterController", function($scope){
	
});

amanuensis.directive("amCharacterDirective", function(){
	
	dir = {
		template : "{{character.name}}:{{character.text}}",
		restrict:'E',
		
	}
	return dir;
	
});


amanuensis.factory("database", function(){
	
});

/**/
