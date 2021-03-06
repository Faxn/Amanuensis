angular.module("amanuensisc", [
	'ui.router',
	'ui.bootstrap'
])

/*
 * Design mock up.
 */

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
	
	//used only as a filter when typing in skill searches
	$scope.skillList = [
		'Acrobatics', 'Appraise', 'Bluff', 'Climb', 'Craft', 'Diplomacy', 'Disable Device', 
		'Disguise', 'Escape Artist', 'Fly', 'Handle Animal', 'Heal', 'Intimidate', 'Knowledge (Arcana)', 
		'Knowledge (Dungeoneering)', 'Knowledge (Engineering)', 'Knowledge (Geography)', 
		'Knowledge (History)', 'Knowledge (Local)', 'Knowledge (Nature)', 'Knowledge (Nobility)', 
		'Knowledge (Planes)', 'Knowledge (Religion)', 'Linguistics', 'Perception', 'Perform', 'Profession',
		'Ride', 'Sense Motive', 'Sleight of Hand', 'Spellcraft', 'Stealth', 'Survival', 'Swim', 'Use Magic Device'		
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
	
	$scope.addSkill = function() {
		//will cause an error if you try to push to skills, but skills is not defined
		$scope.party[$scope.currentChar].skills.push({"name":"","ranks":0});
	}
	
	$scope.removeSkill = function(index) {
		$scope.party[$scope.currentChar].skills.splice(index,1);
	}
	
	$scope.addClass = function() {
		//will cause an error if you try to push to skills, but skills is not defined
		$scope.party[$scope.currentChar].classes.push({"name":"","ranks":0});
	}
	
	$scope.removeClass = function(index) {
		$scope.party[$scope.currentChar].classes.splice(index,1);
	}
	
	$scope.handleRollRequest = function(rollType) {
		switch (rollType) {
			case 'damage':
				var tempAttack = $scope.party[$scope.currentChar].attack, damageResult;
				if(tempAttack === undefined) {
					alert('Currentlly selected character does not have an attack');
				}
				damageResult = roll(tempAttack.damageDiceNum, tempAttack.damageDiceFace, tempAttack.damageBonus);
				dice = tempAttack.damageDiceNum+'d'+tempAttack.damageDiceFace+'+'+tempAttack.damageBonus;
				rollRecord($scope.party[$scope.currentChar].name, damageResult, dice, 'damage');
				break;
			
			case 'attack':
				var theChar = $scope.party[$scope.currentChar];
				rollResult = rollAttack(theChar.attack.toHit, theChar.attack.critMin, theChar.attack.critMult);
				rollRecord(theChar.name, rollResult, "d20+"+theChar.attack.toHit, 'attack');
				
				break;
			
			case 'skill':
				var bonus = 0, tempChar = $scope.party[$scope.currentChar];

				for( i=0 ; i<tempChar.skills.length ; i++ ) {
					if (tempChar.skills[i].name === $scope.selectedSkill) {
						bonus = tempChar.skills[i].ranks
					}
				}
				rollRecord( tempChar.name, rollSkill(bonus), "d20+ "+bonus, $scope.selectedSkill);
				
				break;
				
			default:
				console.error("unknown roll type passed to handleRollRequest()");
				console.log(rollType);
		}
		//any other neccesary roll types?
	}
	
	roll = function(diceNum, diceFace, bonus) {
		var diceResult = 0;
		for( i=0 ; i<diceNum ; i++ ) {
			diceResult += Math.floor(Math.random()*diceFace) +1 +bonus;
		}
		return diceResult;
	}
	
	rollAttack = function(bonus, critMin, critMult){
		var diceResult = Math.floor(Math.random()*20) +1;
		
		if (diceResult >= critMin) { 
			diceResult = Math.floor(Math.random()*20) +1 +bonus;
			diceResult = "CRIT THREAT: "+diceResult;
		}	else	{
			diceResult += bonus;
		}
		
		return diceResult;
	}
	
	rollSkill = function(skillBonus) {
		var result = roll(1, 20, skillBonus); 
		return result;
	}
	
	rollRecord = function(charName, rollNum, dice, type) {
		timestamp = new Date().getTime();
		$scope.rollHistory.push( {timestamp: timestamp, charName: charName, rollNum: rollNum, dice:dice, type: type} );
	}
	
	resetRollHistory = function() {
		$scope.rollHistory = [];
	}
	
	return $scope.exampleCtrl = this;
})

.factory("exampleParty", function() {
	//this will eventually be replaced with a service that grabs party data from a server
	
	party = [
		{
			name: 'Vaesir',
			classes: [
				{ name: 'cavalier', lvls: 3 }
			],
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
			classes: [
				{ name: 'druid', lvls: 3 },
				{ name: 'megafrog', lvls: 1 }
			],
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
			classes: [
				{ name: 'wizard', lvls: 3 },
				{ name: 'slimelord', lvls: 2 }
			],
			race: 'slime?',
			STR: 10,
			DEX: 14,
			CON: 16,
			INT: 18,
			WIS: 8,
			CHA: 4,
			attack : {
				name: "slime bolt",
				toHit: 2,
				damageDiceNum: 3,
				damageDiceFace: 4,
				damageBonus: 1,
				critMin: 20,
				critMult: 2
			}
		},
		{
			name: 'Grobbins',
			classes: [
				{ name: 'bard', lvls: 2 },
				{ name: 'alchemist', lvls: 1 }
			],
			race: 'goblin',
			STR: 7,
			STRrace:-2,
			STRenh:0,
			DEX: 13,
			CON: 17,
			INT: 5,
			WIS: 3,
			CHA: 7,
			attack : {
				name: "firebomb",
				toHit: 3,
				damageDiceNum: 2,
				damageDiceFace: 6,
				damageBonus: 2,
				critMin: 20,
				critMult: 2
			},
			skills : [
				{ name: 'Acrobatics', ranks: 1 },
				{ name: 'Knowledge (Arcana)', ranks: 4 },
				{ name: 'Craft', ranks: 3 },
			]
		}	
	];
	
	return party;
});


