'use strict';

/* Services */

var toteBettingServices = angular.module('toteBettingServices',[]);

toteBettingServices.factory('dividentService', function(){
	var WIN_COMMISSION = 0.15;
	var PLACE_COMMISSION = 0.12;
	var EXACTA_COMMISSION = 0.18;
	var QUINELLA_COMMISSION = 0.18;

	var service = {

		convertResults: function(results) {
			if (typeof results != 'string') {
				return null;
			}
			var resultsArray = results.split(':');
			resultsArray.shift();
			return resultsArray;

		},

		getProductCommission: function(product) {
			var commission = 1;
			switch (product) {
				case 'W':
					commission = WIN_COMMISSION;
					break;
				case 'P':
					commission = PLACE_COMMISSION;
					break;
				case 'E':
					commission = EXACTA_COMMISSION;
					break;
				case 'Q':
					commission = QUINELLA_COMMISSION;
					break;
			}
			return commission;
		},

		getResultRunners: function(resultsArray, product, place) {
			var resultRunners = [];
			var num = 1;

			switch (product) {
				case 'W':
					resultRunners.push(resultsArray[0]);
					break;
				case 'P':
					if (resultsArray.length >= place ) {
						resultRunners.push(resultsArray[place - 1]);

					}
					break;
				case 'E':
				case 'Q':
					if (resultsArray.length >= 2) {
						resultRunners.push(resultsArray[0]);
						resultRunners.push(resultsArray[1]);
							
					}
					break;
			} 
			
			return resultRunners;

		},

		isBetSucessful: function(betSelections, resultRunners, product) {
			var isSuccessful = false;
			switch (product) {
				case 'W':
				case 'P':
					if (resultRunners[0] == betSelections[0]) {
						isSuccessful = true;
					} else {
						isSuccessful = false;
					}
					break;
					
				case 'E':
					if (resultRunners[0] == betSelections[0] && resultRunners[1] == betSelections[1]) {
						isSuccessful = true;
					} else {
						isSuccessful = false;
					}
					break;
				case 'Q':
					if ((resultRunners[0] == betSelections[0] && resultRunners[1] == betSelections[1])
						|| (resultRunners[0] == betSelections[1] && resultRunners[1] == betSelections[0]))
					{
						isSuccessful = true;
					} else {
						isSuccessful = false;
					}
					break;

			}

			return isSuccessful;
		},

		converProductBets: function(productBet, product) {
			if (typeof productBet !== 'string') {
				return null;
			}

			var res = productBet.split(':');
			if (res.length < 3) {
				return null;
			}
			var selections;
			switch (product) {
				case 'W':
				case 'P':
					selections = [res[1]];
					break;
				case 'E':
				case 'Q':
					selections = res[1].split(',');
					break;
				default:
					selections = [res[1]];
			}
			
			var stake = parseFloat(res[2], 10);
			var betObject = {
				selections: selections,
				stake: stake,
			}

			return betObject;

		},

		calDivident: function(totalStake, successfulStake, commission, product) {
			var divident;
			divident = (totalStake * (1 - commission)) / successfulStake;
			if (product == 'P') {
				divident /= 3; 
			}

			return divident;
		},

		calcProductDivdents: function(productBets, results, product, place) {
			var resultsArray = this.convertResults(results);
			if (!resultsArray || resultsArray.length == 0 ) {
				return null;
			};
			var resultRunners = this.getResultRunners(resultsArray, product, place);
			//console.log("resultRunners: ", resultRunners);
			var commission = this.getProductCommission(product);
			var betObjects = [];
			var totalStake = 0;
			var successfulStake = 0;
			for (var i = productBets.length - 1; i >= 0; i--) {
				var betObject = this.converProductBets(productBets[i], product);
				if(betObject) {
					totalStake += betObject.stake;

					if (this.isBetSucessful(betObject.selections, resultRunners, product)) {
						successfulStake += betObject.stake;
					}
					
				}
			};
			//console.log("totalStake: ", totalStake);
			//console.log("successfulStake: ", successfulStake);

			if (successfulStake) {
				var divident = this.calDivident(totalStake, successfulStake, commission, product);
				
			} else {
				//Suppose that if no one wins, the divident 0
				var divident = 0;
			}

			var dividentObject = {
				product: product,
				runners: resultRunners, 
				divident: divident
			}

			return [dividentObject];

		},

		calc: function(bets, results) {
			//console.log('calculating dividents ...')
			var dividents = [];
			var wDividents =  this.calcProductDivdents(bets.wBets, results, 'W');
			var p1Dividents =  this.calcProductDivdents(bets.pBets, results, 'P', 1);
			var p2Dividents =  this.calcProductDivdents(bets.pBets, results, 'P', 2);
			var p3Dividents =  this.calcProductDivdents(bets.pBets, results, 'P', 3);
			var eDividents =  this.calcProductDivdents(bets.eBets, results, 'E');
			var qDividents =  this.calcProductDivdents(bets.qBets, results, 'Q');


			dividents = dividents.concat(wDividents);
			dividents = dividents.concat(p1Dividents);
			dividents = dividents.concat(p2Dividents);
			dividents = dividents.concat(p3Dividents);
			dividents = dividents.concat(eDividents);
			dividents = dividents.concat(qDividents);

			//console.log('dividents: ' + dividents);
			return dividents;
		}
	}

	return service;

});



