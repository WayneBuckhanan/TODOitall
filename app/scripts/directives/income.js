'use strict';

/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:todocard
 * @description
 * # todocard
 */
angular.module('softwareEngineeringTeamApp')
  .directive('income', function () {
    return {
      templateUrl: 'views/income.html',
      restrict: 'E',
			require: 'controllers/todo.js',
      };
  });
