'use strict';

describe('Controller: TableCtrl', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var TableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TableCtrl = $controller('TableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TableCtrl.awesomeThings.length).toBe(3);
  });
});
