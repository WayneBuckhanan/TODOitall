'use strict';

describe('Service: remoteDB', function () {

  // load the service's module
  beforeEach(module('softwareEngineeringTeamApp'));

  // instantiate service
  var remoteDB;
  beforeEach(inject(function (_remoteDB_) {
    remoteDB = _remoteDB_;
  }));

  it('should do something', function () {
    expect(!!remoteDB).toBe(true);
  });

});
