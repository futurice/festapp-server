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

    //Jos tän scheman saa jostain
    var schema = {
        name: { type: String, default: '' },
        picture: String,
        quote: String,
        content: String,
        featured: String,
        status: String,
        stage: String,
        day: String,
        time_start: Date,
        time_stop: Date,
        founded: Number,
        genre: String,
        members: [String],
        albums: [String],
        highlights: String,
        youtube: String,
        spotify: String,
        contact_info: String,
        press_image: String,
        credits: String,
        place: Number
    };

    //Voidaan rakentaa taulukko fields
    $scope.fields = [];

    //Johon tulee oliot joissa on kentät name ja type
    Object.getOwnPropertyNames(schema).forEach(function(name) {
        var type;
        if (schema[name].type)
            type = schema[name].type.toString();
        else
            type = schema[name].toString();
        type = type.split(" ")[1].slice(0,-2);
        $scope.fields.push({"name": name, "type": type})
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
    $scope.hello = 'Welcome Admin!';
    $scope.intro = 'Here you can edit your festival. Please choose the section for further actions.';
  }]);