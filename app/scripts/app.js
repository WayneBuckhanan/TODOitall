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
      'ngRoute',
      'pouchdb',
      'ngMaterial'
    ])
    .config(function($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
          })
          .when('/todo', {
            templateUrl: 'views/todo.html',
            controller: 'ToDoCtrl',
            controllerAs: 'todo'
          })
          .otherwise({
            redirectTo: '/'
          });
    })
    .controller('SideNav', function($scope, $mdSidenav) {
      $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };
    });
