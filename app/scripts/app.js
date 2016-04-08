'use strict';

/**
 * @ngdoc overview
 * @name softwareEngineeringTeamApp
 * @description
 * # softwareEngineeringTeamApp
 *
 * Main module of the application.
 */
angular
  .module('softwareEngineeringTeamApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
