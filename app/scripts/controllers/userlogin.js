'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:UserloginCtrl
 * @description
 * # UserloginCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('UserloginCtrl', function($scope, $mdDialog, isLoggedIn,remoteDB,$window,$q) {

    $scope.loginDialog = function(ev) {
      $mdDialog.show({
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        preserveScope: true,
        scope: $scope
      });
    };

    $scope.getSession = function() {
      isLoggedIn.then(function(result){
        $scope.loginState = result;
      });
    };

    $scope.logout = function() {
      $q.when(remoteDB.logout(function(err) {
        if (err) {
          console.log(err);
        }
      }));
      $window.location.reload();
    };
  });
