'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
    controller('ArtistsListCtrl', function ($scope, $http) {
        $http.get('../api/artists').success(function(data) {
            $scope.artists = data;
        });

    });