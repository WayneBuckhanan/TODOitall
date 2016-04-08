'use strict';

describe('Service: pDB', function () {

  // load the service's module
  beforeEach(module('softwareEngineeringTeamApp'));

  // instantiate service
  var pDB;
  beforeEach(inject(function (_pDB_) {
    pDB = _pDB_;
  }));

  it('should do something', function () {
    expect(!!pDB).toBe(true);
  });

});
