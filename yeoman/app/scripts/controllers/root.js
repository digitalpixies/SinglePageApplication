'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('RootCtrl', function ($scope, $location) {
    $scope.control = {};
    $scope.control.menu = [];
    $scope.control.menu.push({label:'Home',url:'/',link:'#/'});
    $scope.control.menu.push({label:'Emoji',url:'/Emoji',link:'#/Emoji'});
    $scope.$location = $location;
  });
