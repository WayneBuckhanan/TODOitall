'use strict';

describe('Controller: UserloginCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringTeamApp'));

  var UserloginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserloginCtrl = $controller('UserloginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserloginCtrl.awesomeThings.length).toBe(3);
  });
});
