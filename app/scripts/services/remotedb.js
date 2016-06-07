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
      //Setup reference to remote database
      skipSetup: true
    });

    return remoteDB;
  });
