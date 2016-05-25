'use strict';

/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:todocard
 * @description
 * # todocard
 */
angular.module('softwareEngineeringTeamApp')
  .directive('add', function () {
    return {
      templateUrl: 'views/add.html',
      restrict: 'E',
			require: 'controllers/todo.js',
      };
  });
