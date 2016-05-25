'use strict';

/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:todocard
 * @description
 * # todocard
 */
angular.module('softwareEngineeringTeamApp')
  .directive('viewtodos', function () {
    return {
      templateUrl: 'views/viewtodos.html',
      restrict: 'E',
			require: 'controllers/todo.js',
      };
  });
