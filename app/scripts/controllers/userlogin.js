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
        controller: 'UserloginCtrl',
        templateUrl: 'views/login.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

    $scope.currentUser = function() {
      remoteDB.getSession(function(err, response) {
        if (err) {
          return "error";
        } else if (!response.userCtx.name) {
          return "not logged in";
        } else {
          return response.userCtx.name;
        }
      });

    //   return remoteDB.getSession(function(err, response){
    //     if(err){
    //       return "well shit";
    //     }
    //     else if(!response.userCtx.name){
    //       return "no login";
    //     }
    //   });
    // };
  });
