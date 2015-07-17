angular.module("weather", [])
.controller("profileCtrl", ["$scope", "$state", "$location", function($scope, $state, $location){
  $scope.test = 42;
}]);
