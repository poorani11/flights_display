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

// CONTROLLERS
flightApp.controller('homeController', ['$scope','JsonService','seatService', function($scope,JsonService,seatService){
    JsonService.query(function(data){
        console.log(data);
    $scope.seats = data.Seats_available;
  });
    $scope.$watch('seats', function(){
        seatService.seats = $scope.seats;

    });
}]);