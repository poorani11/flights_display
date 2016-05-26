// MODULE
var flightApp = angular.module('flightApp', ['ngRoute', 'ngResource']);

// ROUTES
flightApp.config(function ($routeProvider){

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/flight-display', {
        templateUrl: 'pages/flight-display.html',
        controller: 'flightController'
    })
});

//SERVICEs
flightApp.service('seatService', function(){

    this.seats = "29";

});

//FACTORIES
flightApp.factory('JsonService', function($resource) {
  return $resource('flights/flights.json',{ }, {
    getData: {method:'GET', isArray: false}
  });
});

//FILTERS
flightApp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});

// CONTROLLERS
flightApp.controller('homeController', ['$scope','JsonService','seatService', function($scope,JsonService,seatService){
    
    $scope.date = {
         value: convertToDate('10/31/1997 23:00')
       };

    JsonService.query(function(data){
        console.log(data);
        $scope.list= data;
        $scope.from_destination=data.From;
        $scope.to_destination=data.To;
    $scope.seats = data.Seats_available;
  });
    $scope.$watch('seats', function(){
        seatService.seats = $scope.seats;

    });
}]);

  function convertToDate(str) {
       var arr = str.split(/[\/ :]/);
       var date = new Date(+arr[2], +arr[0] + 1, +arr[1], +arr[3], +arr[4]);
       return date;
       
     }