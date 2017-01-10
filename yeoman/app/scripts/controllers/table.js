'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('TableCtrl', function ($scope, PublicData) {
    $scope.countries = PublicData.GetCountries();
    $scope.header = Object.keys($scope.countries[0]);
    $scope.control={};
    $scope.control.pageSize = 20;
    $scope.control.currentPage = 1;
  });
