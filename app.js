// MODULE
var flightApp = angular.module('flightApp', ['ngRoute', 'ngResource','ngCookies']);

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
flightApp.service('digestService', function(){

    this.seats = "29";
    this.from_destination = "Chennai";
    this.to_destination = "Delhi";

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
flightApp.controller('homeController', ['$scope','JsonService','digestService', function($scope,JsonService,digestService){
    
    $scope.date = {
         value: convertToDate('DD/MM/YYYY 23:00')
       };

    JsonService.query(function(data){
        console.log(data);
        $scope.list= data;
    });

    $scope.seats = digestService.seats;
    $scope.from_destination=digestService.from_destination;
    $scope.to_destination=digestService.to_destination;

    $scope.$watch('[seats,from_destination,to_destination ]', function(){
        digestService.seats = $scope.seats;
        digestService.from_destination = $scope.from_destination;
        digestService.to_destination=$scope.to_destination;


    });
}]);

flightApp.controller('flightController', ['$scope','JsonService','digestService', function($scope,JsonService,digestService){
    
    $scope.seats = digestService.seats;
    $scope.from_destination=digestService.from_destination;
    $scope.to_destination=digestService.to_destination;
}]);

  function convertToDate(str) {
       var arr = str.split(/[\/ :]/);
       var date = new Date(+arr[2], +arr[0] + 1, +arr[1], +arr[3], +arr[4]);
       return date;
       
     }