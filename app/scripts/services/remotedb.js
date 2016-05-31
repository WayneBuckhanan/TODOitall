'use strict';

/**
 * @ngdoc service
 * @name softwareEngineeringTeamApp.remoteDB
 * @description
 * # remoteDB
 * Factory in the softwareEngineeringTeamApp.
 */
angular.module('softwareEngineeringTeamApp')
  .factory('remoteDB', function() {

    var remoteDB = new PouchDB('http://todoitall.mercs.net:5984/todo', {
      skipSetup: true
    });

    return remoteDB;
  });
