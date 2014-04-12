'use strict';

/* Controllers */
var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.
    controller('ArtistsListCtrl', ['$scope', 'Artist', function ($scope, Artist) {
            $scope.artists = Artist.query();
    }]);

myAppControllers.
    controller('EventsListsCtrl', ['$scope', 'Events', function ($scope, Event) {
        $scope.events = Event.query();
    }]);

myAppControllers.
    controller('HomeCtrl', ['$scope', function($scope) {
        $scope.hello = 'Hola!';
    }]);

myAppControllers.
    controller('NewsListCtrl', ['$scope', 'News', function($scope, News) {
        $scope.news = News.query();
    }]);

myAppControllers.
    controller('LocationsListCtrl', ['$scope', 'Locations',function($scope, Locations) {
        $scope.locations = Locations.query();
    }]);

myAppControllers.
    controller('InfoListCtrl', ['$scope', 'Info', function($scope, Info) {
        $scope.info = Info.query();
    }]);

myAppControllers.
    controller('FestivalCtrl', ['$scope', 'Festival', function($scope, Festival) {
        $scope.hello2 = Festival.query();
    }]);