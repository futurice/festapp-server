'use strict';

/* Controllers */
var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.
    controller('ArtistsListCtrl', ['$scope', '$routeParams', '$location', 'Artist', function ($scope, $routeParams, $location, Artist) {

            Artist.query(function(response){
              $scope.artists = response;
            });
    }]);

myAppControllers.
  controller('ArtistCtrl', ['$scope', '$routeParams', '$location', 'Artist', function ($scope, $routeParams, $location, Artist) {

    Artist.get({artistId: $routeParams.artistId}, function(artist) {
      $scope.artist = artist;
    });

    $scope.saveArtist = function(){
      Artist.update({ artistId:$scope.artist._id},$scope.artist);
    }
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
        $scope.news = query();
    }]);

myAppControllers.
    controller('LocationsListCtrl', ['$scope', 'Locations',function($scope, Locations) {
        $scope.locations = query();
    }]);

myAppControllers.
    controller('InfoListCtrl', ['$scope', 'Info', function($scope, Info) {
        $scope.info = query();
    }]);

myAppControllers.
    controller('FestivalCtrl', ['$scope', 'Festival', function($scope, Festival) {
        $scope.hello2 = Festival.query();
    }]);