'use strict';

/**
 * @ngdoc service
 * @name softwareEngineeringTeamApp.isLoggedIn
 * @description
 * # isLoggedIn
 * Factory in the softwareEngineeringTeamApp.
 */
angular.module('softwareEngineeringTeamApp')
  .factory('isLoggedIn', function(remoteDB, $q) {

    var y = $q.when(remoteDB.getSession()).then(function(res, err) {
        if (err) {
          return "error";
        }
        if (!res.userCtx.name) {
          return "loginEmpty";
        } else {
          return res.userCtx.name;
        }
      });
      return y;
    })
