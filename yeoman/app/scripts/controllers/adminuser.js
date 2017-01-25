'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:AdminuserCtrl
 * @description
 * # AdminuserCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('AdminuserCtrl', function ($scope) {
    $scope.users = [];
    $scope.header = $scope.users.length>0?Object.keys($scope.users[0]):[];
    $scope.control={};
    $scope.control.pageSize = 20;
    $scope.control.currentPage = 1;
    $scope.control.show="list";
    $scope.ShowAdd = function() {
      $scope.control.show="add";
    };
    $scope.Cancel = function() {
      $scope.control.show="list";
    };
    $scope.Add = function() {
      $scope.control.show="list";
    }
  });
