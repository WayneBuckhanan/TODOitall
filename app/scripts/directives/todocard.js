'use strict';

/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:todocard
 * @description
 * # todocard
 */
angular.module('softwareEngineeringTeamApp')
  .directive('todocard', function () {
    return {
      templateUrl: 'views/todocard.html',
      restrict: 'E',
			require: 'controllers/todo.js',
      };
  });