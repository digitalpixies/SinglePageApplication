'use strict';

describe('Service: PublicData', function () {

  // load the service's module
  beforeEach(module('yeomanApp'));

  // instantiate service
  var PublicData;
  beforeEach(inject(function (_PublicData_) {
    PublicData = _PublicData_;
  }));

  it('should do something', function () {
    expect(!!PublicData).toBe(true);
  });

});
