var toteBettingControllers = angular.module('toteBettingControllers', ['toteBettingServices']);


toteBettingControllers.controller('ToteBettingCtrl', function ($scope) {
  
});


toteBettingControllers.controller('dividentCtrl', ['$scope', 'dividentService', function ($scope, dividentService) {
  $scope.bets = {};
  $scope.bets.wBets = [
  	"W:1:3",
  	"W:2:4",
  	"W:3:5",
  	"W:4:5",
  	"W:1:16",
  	"W:2:8",
  	"W:3:22",
  	"W:4:57",
  	"W:1:42",
  	"W:2:98",
  	"W:3:63",
  	"W:4:15"

  ];

  $scope.bets.pBets = [
  	"P:1:31",
  	"P:2:89",
  	"P:3:28",
  	"P:4:72",
  	"P:1:40",
  	"P:2:16",
  	"P:3:82",
  	"P:4:52",
  	"P:1:18",
  	"P:2:74",
  	"P:3:39",
  	"P:4:105"
  ];

  $scope.bets.eBets = [
  	"E:1,2:13",
  	"E:2,3:98",
  	"E:1,3:82",
  	"E:3,2:27",
  	"E:1,2:5",
  	"E:2,3:61",
  	"E:1,3:28",
  	"E:3,2:25",
  	"E:1,2:81",
  	"E:2,3:47",
  	"E:1,3:93",
  	"E:3,2:51"

  ];

   $scope.bets.qBets = [
  	"Q:1,2:19",
  	"Q:2,3:77",
  	"Q:1,3:26",
  	"Q:2,4:63",
  	"Q:1,2:66",
  	"Q:2,3:82",
  	"Q:1,3:90",
  	"Q:2,4:48",
  	"Q:1,2:18",
  	"Q:2,3:93",
  	"Q:1,3:62",
  	"Q:2,4:25"

  ];

  $scope.results="R:2:3:1:4";

  $scope.dividents = dividentService.calc($scope.bets, $scope.results);

  $scope.$watch('results', function(newVal, oldVal){
	if (newVal === oldVal) {
        return;
    }
    $scope.dividents = dividentService.calc($scope.bets, $scope.results);	
  })
}]);

