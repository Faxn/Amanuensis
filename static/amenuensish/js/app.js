angular.module("exampleApp", [
	'ui.router',
	'ui.bootstrap'
])

.controller('exampleCtrl', function($scope, exampleParty) {
	$scope.party = exampleParty; // grab the party data from the factory
	$scope.partyLength = $scope.party.length;
	$scope.currentChar=3;
	$scope.rollHistory=[]; //contents of this will look like {timestamp, charName, rollNum}
	
	$scope.rollOptions = [
		{ label: 'attack', value: 'attack' },
		{ label: 'damage', value: 'damage' },
		{ label: 'skill',  value: 'skill'  }
	];
	
	//used to save state of whether sections are collapsed or not
	$scope.isCollapsed={
		name:		false,
		abilites:	false,
		classes:	false,
		achpcmb:	false,
		saves:		false,
		armor:		false,
		attacks:	false,
		skills:		false
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

	$scope.handleRollRequest = function(rollType) {
		switch (rollType) {
			case 'damage':
				console.log("damage roll is TODO");
				//pull numDice, numFace, bonus out of models
				//roll()
				break;
			
			case 'attack':
				numDice = 1, numFace = 20, enemyAC =
				//pull numDice, numFace, critMin, enemyAC out of models
				result = $scope.rollAttack(4, 19, 2, 14); //temporarily hardcoded
				$scope.rollRecord($scope.party[$scope.currentChar].name, result);
				break;
			
			case 'skill':
				console.log("skill roll is TODO");
				//TODO : pull skillBonus out of models, diceNum = 1, diceFace = 20
				//roll() 
				break;
				
			default:
				console.error("unknown roll type passed to handleRollRequest()");
				console.log(rollType);
		}
		//any other neccesary roll types?
	}
	
	$scope.roll = function(diceNum, diceFace, bonus) {
		var diceResult;
		
		for(i=0; i++; i<diceNum) {
			diceResult += Math.floor(Math.random()*diceFace) +1 +bonus;
		}
		return result;
	}

	$scope.rollAttack = function(bonus, critMin, critMult, enemyAC){
		var diceResult = Math.floor(Math.random()*20) +1;
		
		if (diceResult >= critMin) { 
			console.log("Critical Threat!");
			diceResult = 999; //an unconfirmed crit is still a guarenteed hit
			//roll again to confirm - 
			diceResult = Math.floor(Math.random()*20) +1 +bonus;
			if (diceResult <= enemyAC) { 
				console.log("Crit Confirmed!  "+critMult+"x damage!"); 
				diceResult += " (CRIT)"//maybe instead it should return 'CRIT'?
			} 
		}	else	{
			diceResult += bonus;
		}
		
		return diceResult;
	}
	
	$scope.rollRecord = function(charName, rollNum) {
		timestamp = new Date().getTime();
		$scope.rollHistory.push( {timestamp: timestamp, charName: charName, rollNum: rollNum} );
	}
	
	$scope.resetRollHistory = function() {
		$scope.rollHistory = [];
	}
	
	return $scope.exampleCtrl = this;
})

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
			CHA: 10,
			attack : {
				name: "lance",
				toHit: 4,
				damageDiceNum: 1,
				damageDiceFace: 10,
				damageBonus: 5,
				critMin: 20,
				critMult: 4
			}
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
			CHA: 8,
			attack : {
				name: "Shillelagh",
				toHit: 2,
				damageDiceNum: 1,
				damageDiceFace: 6,
				damageBonus: 1,
				critMin: 20,
				critMult: 2
			}
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


