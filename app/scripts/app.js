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
    'ngMaterial',
    'data-table',
    'ngMessages'
  ])
  .config(function($routeProvider, $mdThemingProvider) {
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
      .when('/todoData', {
        templateUrl: 'views/todoData.html',
        controller: 'ToDoCtrl',
        controllerAs: 'todo'
      })
      .when('/todoData2', {
        templateUrl: 'views/todoData2.html',
        controller: 'ToDoCtrl',
        controllerAs: 'todo'
      })
      .otherwise({
        redirectTo: '/'
      });


    $mdThemingProvider.theme('altTheme').primaryPalette('green', {
      'default': '900'
    }).accentPalette('yellow', {
      'default': '900'
    }).warnPalette('red', {
      'default': '900'
    });
  })
  .controller('SideNav', function($scope, $mdSidenav) {
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  });
