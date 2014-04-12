'use strict';

/* Controllers */
var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.
    controller('ArtistsListCtrl', ['$scope', 'Artist', function ($scope, Artist) {
            $scope.artists = Artist.query();
    }]);

myAppControllers.
    controller('HomeCtrl', ['$scope', function($scope) {
        $scope.hello = 'Hola!';
    }]);