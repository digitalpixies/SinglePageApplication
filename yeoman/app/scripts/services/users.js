'use strict';

/**
 * @ngdoc service
 * @name yeomanApp.Users
 * @description
 * # Users
 * Factory in the yeomanApp.
 */
angular.module('yeomanApp')
  .factory('UsersAPI', function ($resource, AppConfig) {
    return $resource(AppConfig.UsersAPIURL,
      {id:'@id'}
    );
  });
