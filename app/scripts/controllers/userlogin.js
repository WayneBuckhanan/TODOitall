'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:UserloginCtrl
 * @description
 * # UserloginCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('UserloginCtrl', function ($scope, $mdDialog) {
    $scope.loginDialog = function(ev) {
        $mdDialog.show({
          controller: 'UserloginCtrl',
          templateUrl: 'views/login.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        });
      };
    $scope.signup
  });
