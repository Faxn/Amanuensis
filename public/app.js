

amanuensis = angular.module("Amanuensis", ['ngResource']);

amanuensis.controller("mainController", function($scope, $http, $resource){
	
	$scope.currentCharacterId = 111111111111;
	$scope.character = {name:'not', text:'loaded'};
	
	var CharacterResource = $resource('/character/:id', {id:'@_id'});
	
	$scope.characterList=[{name:'not', id:'loaded'}];
	
	$http.get('/character_list').success(function(data, status, headers, config){
		$scope.characterList=data;
	})
	
	//If current Id changes grab the data for it
	$scope.$watch('currentCharacterId', function(newValue){
		if(newValue.length >= 12){
			$scope.character = CharacterResource.get({id:newValue});
		}
	});
	
	$scope.dump = function(){
		console.log($scope.character);
	};
	
});

amanuensis.directive('amCharacterChooser', function(){
	dir = {
		
		templateUrl:"templates/CharacterChooser.htm",
		restrict:'E',
	}
	
	return dir;
});

amanuensis.directive("amCharacterSheet", function(){
	
	dir = {
		templateUrl:"templates/CharacterSheet.htm",
		restrict:'E',
		
	}
	return dir;
	
});

amanuensis.controller("sheetController", function($scope, $http, $resource){
	
	$scope.sheet = [
        {label:'Str', content:'12' ,value:''},
        {label:'Dex', content:'12' ,value:''},
        {label:'Con', content:'12' ,value:''}
    ];
	
});

amanuensis.directive("amSheetDetail", function(){
	
	dir = {
		templateUrl:"templates/SheetDetail.htm",
		restrict:'E',
		
	}
	return dir;
	
});

amanuensis.directive("amSheetDetailRow", function(){
	
	dir = {
		templateUrl:"templates/SheetDetailRow.htm",
		restrict:'EA',
		
	}
	return dir;
	
});



/**/
