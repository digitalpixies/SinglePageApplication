'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:AdminuserCtrl
 * @description
 * # AdminuserCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('AdminuserCtrl', function ($scope, UsersAPI) {
    $scope.users = [];
    $scope.header = [];
    $scope.control={};
    var _entry = null;
    $scope.control.pagination = {
      pageSize:5,
      currentPage:1,
      count:0
    };
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
      UsersAPI.get({id:entry.id});
      $scope.entry = angular.copy(entry);
      _entry = entry;
      $scope.control.show="edit";
    };
    $scope.Cancel = function() {
      $scope.ShowList();
    };
    function ShowListCB(data, headers, httpcode) {
      $scope.users = data;
      $scope.control.pagination.count = headers()['angular-count'];
      UpdateUI();
      return data;
    };
    $scope.ShowList = function() {
      $scope.users = UsersAPI.query({pageSize:$scope.control.pagination.pageSize, offset:($scope.control.pagination.currentPage-1)*$scope.control.pagination.pageSize}, ShowListCB);
      $scope.control.show="list";
    };
    $scope.Save = function() {
      for(var i in $scope.entry) {
        _entry[i]=$scope.entry[i];
      }
      _entry.$save().then($scope.ShowList);
    };
    $scope.Add = function() {
      //blank the password. restapi won't pass the password back
      var user = new UsersAPI($scope.entry);
      user.$save(function(data) {
        delete($scope.entry.password);
        $scope.users.push(angular.copy($scope.entry));
        $scope.ShowList();
      });
    };
    $scope.Delete = function(entry) {
      UsersAPI.delete({id:entry.id}, $scope.ShowList);
    };
    function UpdateUI() {
      //header needss an update if it was previously null array
      if($scope.header.length==0)
        $scope.header = $scope.users.length>0?Object.keys($scope.users[0]):[];
    };
    $scope.ShowList();
  });
