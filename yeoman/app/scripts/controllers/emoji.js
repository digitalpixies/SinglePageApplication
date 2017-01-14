'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:EmojiCtrl
 * @description
 * # EmojiCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('EmojiCtrl', function () {
    twemoji.parse($('#message-with-emoji')[0]);
  });
