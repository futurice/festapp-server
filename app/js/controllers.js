'use strict';

/* Controllers */
var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.
    controller('ArtistsListCtrl', ['$scope', '$routeParams', '$location', 'Artist', '$timeout', function ($scope, $routeParams, $location, Artist, $timeout) {

        var query = function () {
            Artist.query(function (response) {
                $scope.artists = response;
            });
        }

        query();

        $scope.createArtistName = {name: ''}

        $scope.createArtist = function () {
            console.log("create");
            Artist.save({'name': $scope.createArtistName.name});
            $timeout(query, 1000);
        }

        $scope.deleteArtist = function (id) {
            console.log("remove");
            Artist.remove({ artistId: id});
            $timeout(query, 1000);
        }


    }]);

myAppControllers.
    controller('ArtistCtrl', ['$scope', '$routeParams', '$location', 'Artist', '$http', function ($scope, $routeParams, $location, Artist, $http) {

        Artist.get({artistId: $routeParams.artistId}, function (artist) {
            $scope.artist = artist;
        });

        $scope.saveArtist = function () {
            console.log("save");
            Artist.update({ artistId: $scope.artist._id}, $scope.artist);
        }

        $scope.schema = [];

        $http.get("/api/v1/schema/artist").success(function (data) {
            Object.getOwnPropertyNames(data).forEach(function (name) {
                var type = (data[name].type) || data[name]
                $scope.schema.push({"name": name, "type": type})
            });
        });

    }]);

myAppControllers.
    controller('EventsListCtrl', ['$scope', 'Event', "$timeout", function ($scope, Event, $timeout) {

        var query = function () {
            Event.query(function (response) {
                $scope.events = response;
            });
        }

        query();

        $scope.createEventTitle = {title: ''}

        $scope.createEvent = function () {
            console.log("create");
            Event.save({'title': $scope.createEventTitle.title});
            $timeout(query, 1000);
        }

        $scope.deleteEvent = function (id) {
            console.log("remove");
            Event.remove({ eventId: id});
            $timeout(query, 1000);
        }

    }]);

myAppControllers.
    controller('EventCtrl', ['$scope', '$routeParams', '$location', 'Event', '$http', function ($scope, $routeParams, $location, Event, $http) {

        Event.get({eventId: $routeParams.eventId}, function (event) {
            $scope.event = event;
        });

        $scope.saveEvent = function () {
            console.log("save");
            Event.update({ eventId: $scope.event._id}, $scope.event);
        }

        $scope.schema = [];

        $http.get("/api/v1/schema/event").success(function (data) {
            Object.getOwnPropertyNames(data).forEach(function (name) {
                var type = (data[name].type) || data[name]
                $scope.schema.push({"name": name, "type": type})
            });
        });

    }]);

myAppControllers.
    controller('NewsListCtrl', ['$scope', 'News', '$timeout', function ($scope, News, $timeout) {

        var query = function () {
            News.query(function (response) {
                $scope.news = response;
            });
        }

        query();

        $scope.createNewsTitle = {title: ''}

        $scope.createNews = function () {
            console.log("create");
            News.save({'title': $scope.createNewsTitle.title});
            $timeout(query, 1000);
        }

        $scope.deleteNews = function (id) {
            console.log("remove");
            News.remove({ newsItemId: id});
            $timeout(query, 1000);
        }

    }]);

myAppControllers.
    controller('NewsCtrl', ['$scope', '$routeParams', '$location', 'News', '$http', function ($scope, $routeParams, $location, News, $http) {

        News.get({newsItemId: $routeParams.newsItemId}, function (news) {
            $scope.newsItem = news;
        });

        $scope.saveNews = function () {
            console.log("save");
            News.update({ newsItemId: $scope.newsItem._id}, $scope.newsItem);
        }

        $scope.schema = [];

        $http.get("/api/v1/schema/news").success(function (data) {
            Object.getOwnPropertyNames(data).forEach(function (name) {
                var type = (data[name].type) || data[name]
                $scope.schema.push({"name": name, "type": type})
            });
        });

    }]);

myAppControllers.
    controller('LocationsListCtrl', ['$scope', 'Location', '$timeout', function ($scope, Location, $timeout) {

        var query = function () {
            Location.query(function (response) {
                $scope.locations = response;
            });
        }

        query();

        $scope.createLocationName = {name: ''};

        $scope.createLocation = function () {
            console.log("create");
            Location.save({'name': $scope.createLocationName.name});
            $timeout(query, 1000);
        }

        $scope.deleteLocation = function (id) {
            console.log("remove");
            Location.remove({ locationId: id});
            $timeout(query, 1000);
        }

    }]);

myAppControllers.
    controller('LocationCtrl', ['$scope', '$routeParams', '$location', 'Location', '$http', function ($scope, $routeParams, $location, Location, $http) {

        Location.get({locationId: $routeParams.locationId}, function (location) {
            $scope.location = location;
        });

        $scope.saveLocation = function () {
            console.log("save");
            Location.update({ locationId: $scope.location._id}, $scope.location);
        }

        $scope.schema = [];

        $http.get("/api/v1/schema/location").success(function (data) {
            Object.getOwnPropertyNames(data).forEach(function (name) {
                var type = (data[name].type) || data[name]
                $scope.schema.push({"name": name, "type": type})
            });
        });

    }]);

myAppControllers.
    controller('InfoListCtrl', ['$scope', 'Info', '$timeout', function ($scope, Info, $timeout) {

        var query = function () {
            Info.query(function (response) {
                $scope.infos = response;
            });
        }

        query();

        $scope.createInfoTitle = {title: ''}

        $scope.createInfo = function () {
            console.log("create");
            Info.save({'title': $scope.createInfoTitle.title});
            $timeout(query, 1000);
        }

        $scope.deleteInfo = function (id) {
            console.log("remove");
            Info.remove({ infoItemId: id});
            $timeout(query, 1000);
        }
    }]);

myAppControllers.
    controller('InfoCtrl', ['$scope', '$routeParams', '$location', 'Info', '$http', function ($scope, $routeParams, $location, Info, $http) {

        Info.get({infoItemId: $routeParams.infoItemId}, function (info) {
            $scope.infoItem = info;
        });

        $scope.saveInfo = function () {
            console.log("save");
            Info.update({ infoItemId: $scope.infoItem._id}, $scope.infoItem);
        }

        $scope.schema = [];

        $http.get("/api/v1/schema/info").success(function (data) {
            Object.getOwnPropertyNames(data).forEach(function (name) {
                var type = (data[name].type) || data[name]
                $scope.schema.push({"name": name, "type": type})
            });
        });

    }]);

myAppControllers.
    controller('FestivalCtrl', ['$scope', '$routeParams', '$location', 'Festival', '$http', function ($scope, $routeParams, $location, Festival, $http) {

        Festival.query(function (response) {
            $scope.festival = response[0];
        });

        $scope.saveFestival = function () {
            Festival.update({ festivalId: $scope.festival._id}, $scope.festival);
        }

        $scope.schema = [];

        $http.get("/api/v1/schema/festival").success(function (data) {
            Object.getOwnPropertyNames(data).forEach(function (name) {
                var type = (data[name].type) || data[name]
                $scope.schema.push({"name": name, "type": type})
            });
        });
    }]);

myAppControllers.
    controller('HomeCtrl', ['$scope', function ($scope) {
        $scope.hello = 'Hola!';
    }]);
