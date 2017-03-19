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
    $scope.header = [];
    $scope.control={};
    var _entry = null;
    $scope.control.pageSize = 20;
    $scope.control.currentPage = 1;
    $scope.control.show="list";
    $scope.ShowAdd = function() {
      $scope.entry = angular.copy({
        email:''
        , password:''
        , firstname:''
        , lastname:''
      });
      $scope.control.show="add";
    };
    $scope.ShowEdit = function(entry) {
      $scope.entry = angular.copy(entry);
      _entry = entry;
      $scope.control.show="edit";
    };
    $scope.Cancel = function() {
      $scope.control.show="list";
    };
    $scope.Edit = function() {
      for(var i in $scope.entry) {
        _entry[i]=$scope.entry[i];
      }
      $scope.control.show="list";
      UpdateUI();
    };
    $scope.Add = function() {
      //blank the password. restapi won't pass the password back
      delete($scope.entry.password);
      $scope.users.push(angular.copy($scope.entry));
      $scope.control.show="list";
      UpdateUI();
    };
    $scope.Delete = function(i) {
      $scope.users.splice(i,1);
    };
    function UpdateUI() {
      //header needss an update if it was previously null array
      if($scope.header.length==0)
        $scope.header = $scope.users.length>0?Object.keys($scope.users[0]):[];
    }
  });
