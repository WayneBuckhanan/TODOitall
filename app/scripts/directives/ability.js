'use strict';

/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:todocard
 * @description
 * # todocard
 */
angular.module('softwareEngineeringTeamApp')
  .directive('ability', function () {
    return {
      templateUrl: 'views/ability.html',
      restrict: 'E',
			require: 'controllers/todo.js',
      };
  });
