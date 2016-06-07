'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('LoginCtrl', function($scope, remoteDB, $window, $q) {
    var vm = this;
    $scope.createAcc = false;

    $scope.signup = function() {
      if ($scope.createAcc === true) {
        remoteDB.signup($scope.username, $scope.password, function(err) {
          if (err) {
            if (err.name === 'conflict') {
            } else if (err.name === 'forbidden') {
            } else if ($scope.password !== $scope.passwordCheck) {
            } else {

            }
          } else {
            $scope.createAcc = true;
          }
        });

        $scope.createAcc = false;
        $scope.username = '';
        $scope.password = '';
        $scope.passwordCheck = "";
      } else {
        $scope.createAcc = true;
      }
    };
    $scope.login = function() {
      $q.when(remoteDB.login($scope.username, $scope.password).then( function(err) {
        if (err) {
          if (err.name === 'unauthorized') {
            //console.log(err);
            console.log(vm.loginForm.username);
            vm.loginForm.username.$setValidity("incorrectLogin",false);
            $scope.error = "incorrectLogin";
          } else {
            $window.location.reload();
            $scope.username = "";
            $scope.password = "";
          }
        }
      }));
    };
  });
