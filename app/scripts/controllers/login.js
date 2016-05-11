'use strict';

/**
 * @ngdoc function
 * @name softwareEngineeringTeamApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the softwareEngineeringTeamApp
 */
angular.module('softwareEngineeringTeamApp')
  .controller('LoginCtrl', function($scope,pDB) {
      $scope.signup = function() {
        pDB.signup($scope.username, $scope.password, function(err, response) {
            if (err) {
              if (err.name === 'conflict') {
              } else if (err.name === 'forbidden') {
              } else if ($scope.password !== $scope.passwordCheck){

              }
            });
        }
        $scope.login = function() {
          pDB.login($scope.username, $scope.password, function(err, response) {
            if (err) {
              if (err.name === 'unauthorized') {
              } else {
              }
            }
          });
        }
      });
