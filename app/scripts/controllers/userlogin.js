'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:UserloginCtrl
 * @description
 * # UserloginCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('UserloginCtrl', function($scope, $mdDialog, remoteDB) {
    $scope.loginDialog = function(ev) {
      $mdDialog.show({
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

  $scope.currentUser = remoteDB.getSession(function(err, response) {
      if (!response.userCtx.name) {
        $scope.currentUser = "not logged in";
      } else {
        $scope.currentUser = response.userCtx.name; //response.userCtx.name;
      }
    });
  });
