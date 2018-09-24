(function() {

    "use strict";
  
    var App = angular.module("App", [
      "App.controllers",
    //  "App.service",
      "ngRoute"
    ]);
  
    App.config(function ($routeProvider) {
      $routeProvider
        .when('/home', {
             templateUrl: 'view/home.html',
             controller: 'homeController'
        })
        .when('/admin', {
             templateUrl: 'view/admin.html',
             controller: 'adminController'
        })
        .when('/about', {
          templateUrl: 'view/about.html',
          controller: 'aboutController'
     }  ) 
        .otherwise({redirectTo : 'home'});
    });
  
  }());