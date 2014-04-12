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
  controller('ArtistCtrl', ['$scope', '$routeParams', '$location', 'Artist', '$http', function ($scope, $routeParams, $location, Artist, $http) {

    Artist.get({artistId: $routeParams.artistId}, function(artist) {
      $scope.artist = artist;
    });

    $scope.schema = [];

    $http.get("../public/models/artist.json").success(function (data) {
        Object.getOwnPropertyNames(data).forEach(function (name) {
            var type = (data[name].type) || data[name]
            $scope.schema.push({"name" : name, "type" : type})
        });
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
  controller('EventCtrl', ['$scope', '$routeParams', '$location', 'Event', function ($scope, $routeParams, $location, Event) {

    Event.get({eventId: $routeParams.eventId}, function(event) {
      $scope.event = event;
    });
    
    $scope.saveEvent = function(){
      Event.update({ eventId:$scope.event._id},$scope.event);
    }
  }]);

myAppControllers.
    controller('NewsListCtrl', ['$scope', 'News', function($scope, News) {
        $scope.news = query();
    }]);

myAppControllers.
  controller('NewsCtrl', ['$scope', '$routeParams', '$location', 'News', function ($scope, $routeParams, $location, News) {

    News.get({newsId: $routeParams.newsId}, function(news) {
      $scope.news = news;
    });

    $scope.saveNews = function(){
      News.update({ newsId:$scope.news._id},$scope.news);
    }
  }]);

myAppControllers.
    controller('LocationsListCtrl', ['$scope', 'Locations',function($scope, Locations) {
        $scope.locations = query();
    }]);

myAppControllers.
  controller('LocationsCtrl', ['$scope', '$routeParams', '$location', 'Locations', function ($scope, $routeParams, $location, Locations) {

    Locations.get({locationsId: $routeParams.locationsId}, function(locations) {
      $scope.locations = locations;
    });

    $scope.saveLocations = function(){
      Locations.update({ locationsId:$scope.locations._id},$scope.locations);
    }
  }]);

myAppControllers.
    controller('InfoListCtrl', ['$scope', 'Info', function($scope, Info) {
        $scope.info = query();
    }]);

myAppControllers.
  controller('InfoCtrl', ['$scope', '$routeParams', '$location', 'Info', function ($scope, $routeParams, $location, Info) {

    Info.get({infoId: $routeParams.infoId}, function(info) {
      $scope.info = info;
    });

    $scope.saveInfo = function(){
      Info.update({ infoId:$scope.info._id},$scope.info);
    }
  }]);

myAppControllers.
  controller('FestivalCtrl', ['$scope', '$routeParams', '$location', 'Festival', function ($scope, $routeParams, $location, Festival) {

    $scope.hello2 = Festival.query();

    Festival.get({festivalId: $routeParams.festivalId}, function(festival) {
      $scope.festival = festival;
    });

    $scope.saveInfo = function(){
      Festival.update({ festivalId:$scope.festival._id},$scope.festival);
    }
  }]);

myAppControllers.
  controller('HomeCtrl', ['$scope', function($scope) {
    $scope.hello = 'Hola!';
  }]);
