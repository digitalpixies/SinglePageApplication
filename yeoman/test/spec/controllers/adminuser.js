'use strict';

describe('Controller: AdminuserCtrl', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var AdminuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminuserCtrl = $controller('AdminuserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminuserCtrl.awesomeThings.length).toBe(3);
  });
});
