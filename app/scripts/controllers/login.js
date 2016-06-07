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
        //Check if signup view is active
        //if so run singup and create new user
        //Error control code not finished
        remoteDB.signup($scope.username, $scope.password, function(err) {
          if (err) {
            if (err.name === 'conflict') {
              //User already exists
            } else if (err.name === 'forbidden') {
              //Username not or passoword
            } else if ($scope.password !== $scope.passwordCheck) {
              //check if both passwords enter match
            } else {

            }
          } else {
            //Set signup view to active
            $scope.createAcc = true;
          }
        });

        //set values after login to defualt
        $scope.createAcc = false;
        $scope.username = '';
        $scope.password = '';
        $scope.passwordCheck = "";
      } else {
        $scope.createAcc = true;
      }
    };
    $scope.login = function() {
      $q.when(remoteDB.login($scope.username, $scope.password).then(function(err) {
        if (err) {
          if (err.name === 'unauthorized') {
            //code here wast ment for error control but was not finsished
            console.log(vm.loginForm.username);
            vm.loginForm.username.$setValidity("incorrectLogin", false);
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
