'use strict';

/**
 * @ngdoc directive
 * @name softwareEngineeringTeamApp.directive:userlogin
 * @description
 * # userlogin
 */
angular.module('softwareEngineeringTeamApp')
  .directive('userlogin', function () {
    return {
      templateUrl: 'views/userlogin.html',
      restrict: 'E',
      controller: 'UserloginCtrl',
      controllerAs: 'login'
    };
  });
