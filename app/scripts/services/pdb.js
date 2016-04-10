'use strict';

/**
 * @ngdoc service
 * @name softwareEngineeringTeamApp.pDB
 * @description
 * # pDB
 * Factory in the softwareEngineeringTeamApp.
 */
angular.module('softwareEngineeringTeamApp')
  .factory('pDB', function() {
    var localdb = new PouchDB("db")
    return localdb
  });
