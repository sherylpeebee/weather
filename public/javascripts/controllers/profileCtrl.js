
angular.module("weather")
.controller("profileCtrl", ["$scope", "$location", "$http", function($scope, $location, $http){
  // console.log("profile: ", user);
  $http.get("/currentUser")
  .success(function(data, status){
    console.log(data);
    $scope.email = data.local.email;
  })
  .catch(function(error){
    console.log(error);
  });
  $scope.test = 42;
  var lat, long, city, state, address;
  if (navigator.geolocation) {
    getCoords(googleLocation);
  }
  function googleLocation(){
    $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=true")
    .success(function(data, status){
      console.log(data);
      city = data.results[0].address_components[3].short_name;
      state = data.results[0].address_components[5].short_name;
      address = data.results[0].formatted_address;
      console.log(city, state, address);

      $scope.city = city;
      $scope.state = state;
      $scope.address = address;

      $http.get("http://api.wunderground.com/api/f522dfed0b75cf28/conditions/q/" + state + "/" + city + ".json")
      .success(function(data, status){
        console.log("conditions: ", data);
      });
      $http.get("http://api.wunderground.com/api/f522dfed0b75cf28/forecast/q/" + state + "/" + city + ".json")
      .success(function(data, status){
        console.log("forecast: ", data);
      });
    });
  }
  function getCoords(cb){
    navigator.geolocation.getCurrentPosition(function(position){
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat, long);
      cb();
    });
  }

  $(document).ready(function(){
    console.log("ready!");
   $('.collapsible').collapsible({
   });
  });
}]);
