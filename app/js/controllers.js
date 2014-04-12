'use strict';

/* Controllers */
var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.
    controller('ArtistsListCtrl', ['$scope', '$routeParams', '$location', 'Artist', function ($scope, $routeParams, $location, Artist) {
            $scope.data = {};

            Artist.query(function(response){
              $scope.artists = response;
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


            Artist.get({artistId: $routeParams.artistId}, function(artist) {
              $scope.artist = artist;
            });

            $scope.saveArtist = function(){
              console.log("saved");
              Artist.update({artistId: $scope.artist._id}, $scope.artist);
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