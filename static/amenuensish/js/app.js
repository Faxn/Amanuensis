angular.module("exampleApp", [
	'ui.router',
	'ui.bootstrap'
])
/*
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
		.otherwise('/');
		
	$stateProvider
		.state('party', {
			url: '/',
			template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
              '<p>Use the menu above to navigate. ' +
              'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
              '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
              '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>',
			//templateUrl: 'templates/party.html',
			controller: 'exampleCtrl'
		})
		.state('party.member', {
			url: '/:member',
			//templateUrl: 'templates/party.member.html',
			controller: function($scope, $stateParams){
				//$scope.person = $scope.contacts[$stateParams.id];
			}
		})
	;
})
*/
.controller('exampleCtrl', function($scope, exampleParty) {
	$scope.party = exampleParty; // grab the party data from the factory
	$scope.partyLength = $scope.party.length;
	$scope.currentChar=3;
	
	//used to save state of whether sections are collapsed or not
	$scope.isCollapsed={
		name: false,
		abilites: false,
		classes: false,
		achpcmb:false,
		saves: false,
		armor: false,
		attacks:false,
		skills: false
	}	
	
	$scope.toggleCollapse = function(section) {
		$scope.isCollapsed[section] = !$scope.isCollapsed[section];
	}
	
	$scope.setCurrentChar = function(index) {
		if (index > $scope.partyLength ){
			alert("error!  index of selected character longer than the party list!");
		} else {
			$scope.currentChar=index;
		}
	}
	
	$scope.removeAttribute = function(charIndex, att) {
	}
	
	$scope.addAttribute = function(charIndex, newAtt, newValue){
		party[charIndex][newAtt]=newValue;
		console.log("added attribute");
	}
	
	return $scope.exampleCtrl = this;
})


/* proposed final structure of a 'default character'
	ID: 1,
	description: {
		name: "Vaesir",
		player: "Alpere",
		campaign: "Kingmaker"
	},
	metadata: {
		maybe throw some data in here describing the last time the char data was read/written?
	},
	stats: {
		
		STR: {
			base: 10,
			racial: 2,
			}
		baseDEX: 10,
		baseCON: 10,
		baseINT: 10,
		baseWIS: 10,
		baseCHA: 10
	},
	skills: {
		allOfThem: 0;
	},	
	feats: [
		{
			name: "dodge",
			description: "+1 dodge AC",
			effects: [
				{
					target: "AC",
					value: 1	//this would be negative if it was penalty
				}
			]
	],
	//would it be advantageous to store calculated values (like HP) within the JSON, or better as a variable floating around in the controllers?
	metasStats: {
		HP: 23,
		AC: 13,
		speed: 30
	},	

*/

.factory("exampleParty", function() {
	//this will eventually be replaced with a service that grabs party data from a server
	
	party = [
		{
			name: 'Vaesir',
			charclass: 'cavalier',
			race: 'human',
			STR: 16,
			DEX: 14,
			CON: 15,
			INT: 14,
			WIS: 8,
			CHA: 10
		},
		{
			name: 'Faxn',
			charclass: 'wizard',
			race: 'gripli',
			STR: 8,
			DEX: 14,
			CON: 14,
			INT: 18,
			WIS: 8,
			CHA: 8
		},
		{
			name: 'Hungaron',
			charclass: 'slime lord',
			race: 'slime?',
			STR: 10,
			DEX: 14,
			CON: 16,
			INT: 18,
			WIS: 8,
			CHA: 4
		},
		{
			name: 'Grobbins',
			charclass: 'bard',
			race: 'goblin',
			STR: 7,
			STRrace:-2,
			STRenh:0,
			DEX: 13,
			CON: 17,
			INT: 5,
			WIS: 3,
			CHA: 7
		}	
	];
	
	return party;
});
/*
$scope.setCurrentChar = function(index) {
		if (index > $scope.party.length() ){
			alert("error!  index of selected character longer than the party list!");
		} else {
			$scope.currentChar=index;
		}
	}

function setCurrentChar(index) {
	currentChar = index;
}

function getCurrentChar() {
	return currentChar;
}*/