'use strict';


/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:menubar
 * @description
 * # menubar
 */
angular.module('softwareEngineeringTeamApp')
    .directive('menubar', function() {
      return {
        templateUrl: 'views/menubar.html',
        restrict: 'E',
      };
    });
