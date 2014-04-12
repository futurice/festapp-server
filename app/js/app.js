'use strict';


// Declare admin level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/artists', {templateUrl: './partials/artists.html', controller: 'ArtistsListCtrl'});
        $routeProvider.when('/artist/:artistId', {templateUrl: './partials/artist.html', controller: 'ArtistCtrl'});
        $routeProvider.when('/events', {templateUrl: './partials/events.html', controller: 'EventsListCtrl'});
        $routeProvider.when('/event/:eventId', {templateUrl: './partials/event.html', controller: 'EventCtrl'});
        $routeProvider.when('/news', {templateUrl: './partials/news.html', controller: 'NewsListCtrl'});
        $routeProvider.when('/newsItem/:newsItemId', {templateUrl: './partials/newsItem.html', controller: 'NewsCtrl'});
        $routeProvider.when('/home', {templateUrl: './partials/home.html', controller: 'HomeCtrl'});
        $routeProvider.when('/festival', {templateUrl: './partials/festival.html', controller: 'FestivalCtrl'});
        $routeProvider.when('/info', {templateUrl: './partials/info.html', controller: 'InfoListCtrl'});
        $routeProvider.when('/infoItem/:infoItemId', {templateUrl: './partials/infoItem.html', controller: 'InfoCtrl'});
        $routeProvider.when('/locations', {templateUrl: './partials/locations.html', controller: 'LocationsListCtrl'});
        $routeProvider.when('/location/:locationId', {templateUrl: './partials/location.html', controller: 'LocationCtrl'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
