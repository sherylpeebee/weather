
angular.module("weather")
.controller("profileCtrl", ["$scope", "$location", "$http", function($scope, $location, $http){
  $http.get("/currentUser")
  .success(function(data, status){
    console.log(data);
    $scope.email = data.local.email;
  })
  .catch(function(error){
    console.log(error);
  });

  $(document).ready(function(){
    console.log("ready!");
    $('.toggle-panel').on('click', function(){
      console.log("click");
    });
    $('#panel').scotchPanel({
        containerSelector: 'body', // As a jQuery Selector
        direction: 'top', // Make it toggle in from the left
        duration: 300, // Speed in ms how fast you want it to be
        transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
        clickSelector: '.toggle-panel', // Enables toggling when clicking elements of this class
        distanceX: '70%', // Size fo the toggle
        enableEscapeKey: true // Clicking Esc will close the panel
    });

    $("input#newLocation").keypress(function(event) {
      if (event.which == 13) {
          event.preventDefault();
          var input = $("input#newLocation").val();
          $("input#newLocation").val('');
          // console.log(input);
          var locationArray = input.split(', ');
          var newState = locationArray[1];
          var newCity = locationArray[0].split(' ').join('_');
          console.log(newState);
          console.log(newCity);

          $http.get("//api.wunderground.com/api/f522dfed0b75cf28/conditions/q/" + newState + "/" + newCity + ".json")
          .success(function(data, status){
            console.log("conditions: ", data);
            $scope.conditions = data.current_observation;
          });
          $http.get("//api.wunderground.com/api/f522dfed0b75cf28/forecast/q/" + newState + "/" + newCity + ".json")
          .success(function(data, status){
            console.log("forecast: ", data);
            $scope.forecast = data.forecast.txt_forecast.forecastday;
          });
          $scope.city = newCity.split('_').join(' ');
          $scope.state = newState;
          $scope.address = '';
      }
    });
  });

  var lat, long, city, state, address;
  if (navigator.geolocation) {
    getCoords(googleLocation);
  }
  function googleLocation(){
    $http.get("//maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=true")
    .success(function(data, status){
      console.log(data);
      city = data.results[0].address_components[3].short_name.split(' ').join('_');
      state = data.results[0].address_components[5].short_name;
      address = data.results[0].formatted_address;
      // console.log(city.split(' ').join('_'));
      // console.log(city, state, address);

      $scope.city = city;
      $scope.state = state;
      $scope.address = address;

      $http.get("//api.wunderground.com/api/f522dfed0b75cf28/conditions/q/" + state + "/" + city + ".json")
      .success(function(data, status){
        console.log("conditions: ", data);
        $scope.conditions = data.current_observation;
      });
      $http.get("//api.wunderground.com/api/f522dfed0b75cf28/forecast/q/" + state + "/" + city + ".json")
      .success(function(data, status){
        console.log("forecast: ", data);
        $scope.forecast = data.forecast.txt_forecast.forecastday;
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


}]);
