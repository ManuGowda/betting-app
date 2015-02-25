'use strict';

/* Filters */

var toteBettingFilters = angular.module('toteBettingFilters', []);

toteBettingFilters.filter('productName', function() {
  return function(code) {
  	var productMap = {
		'W': 'Win',
		'P': 'Place',
		'E': 'Exacta',
		'Q': 'Quinella'
	}

	if (typeof productMap[code] !== 'undefined') {
		return productMap[code];
	} else {
		return code;
	}
    
  };
});

toteBettingFilters.filter('arrayJoin', function() {
  return function(array) {
  	return array.join();
    
  };
});
