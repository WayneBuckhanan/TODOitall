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
    var localdb = new pouchDB("db")
    return localdb
  });
