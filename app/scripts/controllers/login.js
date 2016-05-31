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
    $scope.createAcc = false;

    $scope.signup = function() {
      if ($scope.createAcc === true) {
        remoteDB.signup($scope.username, $scope.password, function(err, response) {
          if (err) {
            if (err.name === 'conflict') {
              $scope.error = true;
              $scope.errMes = "This username already exists";
            } else if (err.name === 'forbidden') {
              $scope.errMes = "This username is not allowed";
            } else if ($scope.password !== $scope.passwordCheck) {
              $scope.error = true;
              $scope.errorMes = "Your passwords do not match";
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
          if (err.name === 'unauthorized') {} else {}
        }
      }));
      $window.location.reload();
      $scope.username = "";
      $scope.password = "";
    };
  });
