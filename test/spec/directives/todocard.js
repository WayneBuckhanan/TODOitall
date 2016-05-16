'use strict';

describe('Directive: todocard', function () {

  // load the directive's module
  beforeEach(module('softwareEngineeringTeamApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<todocard></todocard>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the todocard directive');
  }));
});
