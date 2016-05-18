'use strict';

/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:todocard
 * @description
 * # todocard
 */
angular.module('softwareEngineeringTeamApp')
  .directive('mission', function () {
    return {
      templateUrl: 'views/mission.html',
      restrict: 'E',
			require: 'controllers/todo.js',
      };
  });
