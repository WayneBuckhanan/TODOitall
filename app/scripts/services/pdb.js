'use strict';

/**
 * @ngdoc service
 * @name softwareEngineeringTeamApp.pDB
 * @description
 * # pDB
 * Factory in the softwareEngineeringTeamApp.
 */

angular.module('softwareEngineeringTeamApp')
  .factory('pDB', function(pouchDB) {
    //Setup local database
    var localdb = pouchDB("db");
    return localdb;
  });
