'use strict';

/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:todocard
 * @description
 * # todocard
 */
angular.module('softwareEngineeringTeamApp')
  .directive('effort', function () {
    return {
      templateUrl: 'views/effort.html',
      restrict: 'E',
			require: 'controllers/todo.js',
      };
  });
