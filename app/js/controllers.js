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

            $scope.artist = {
              "id": "1",
              "name": "Bad Finance",
              "picture": "public/BadFinance.jpg",
              "quote": "”Having fun! Everyone altogether, let's rock!”",
              "content": "<p>\r\nBAD finance was formed in the early 2011 by three guys, Sakari, Antti and Jari, all working at Futurice Tampere. The band started reheasing at Jari's student dorm in Hervanta but after Futurice office moved into bigger premises the boys got their own band room.</p>\r\n",
              "featured": "no",
              "status": "show",
              "stage": "niitty",
              "day": "Lauantai",
              "time_start": "1373145300",
              "time_stop": "1373149800",
              "founded": "2012",
              "genre": "Love Metal",
              "members": ["Mike Arvela", "Sakari Hyöty", "Antti Mattila"],
              "albums": ["First Album (2012)", "Second Album (2013)", "Third Album (2014)"],
              "highlights": "Bad Finance rocked the place at Futurice Christmas Party 2012.",
              "youtube": "https://www.youtube.com/watch?v=xRKzk0tKchE",
              "spotify": "",
              "contact_info": "Generic contact info, ie. email and phone number",
              "press_image": "public/BadFinance.jpg",
              "credits": "Photo: Futurice Oy",
              "place": "0"
            };
            //Artist.get({artistId: $routeParams.artistId}, function(artist) {
            //});

            $scope.saveArtist = function(){
              console.log("saved");
              Artist.save($scope.artist);
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