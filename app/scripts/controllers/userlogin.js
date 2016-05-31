'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:UserloginCtrl
 * @description
 * # UserloginCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('UserloginCtrl', function($scope, $mdDialog, remoteDB,$q, isLoggedIn) {

    $scope.loginDialog = function(ev) {
      $mdDialog.show({
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

    $scope.getSession = function() {
      isLoggedIn.then(function(result){
        $scope.currentUser = result;
      })
      return $scope.currentUser;
    }
      // $q.when(remoteDB.getSession(function(err, response) {
      //   if (err) {
      //     $scope.currentUser = "nope";
      //     console.log("f");
      //   }
      //   if (!response.userCtx.name) {
      //     $scope.currentUser = "not logged in";
      //     console.log("ff");
      //   } else {
      //     $scope.currentUser = response.userCtx.name;
      //     console.log("fff");
      //   }
      // }));
    //};

    $scope.currentUser = isLoggedIn;
  });
