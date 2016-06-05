'use strict';

/**
 * @ngdoc service
 * @name softwareEngineeringTeamApp.remoteDB
 * @description
 * # remoteDB
 * Factory in the softwareEngineeringTeamApp.
 */
angular.module('softwareEngineeringTeamApp')
  .factory('remoteDB', function(pouchDB) {

    var remoteDB = pouchDB('http://todoitall.mercs.net:5984/todo', {
      skipSetup: true
    });

    return remoteDB;
  });
