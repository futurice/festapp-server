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
        $routeProvider.when('/artists/:artistId', {templateUrl: './partials/artists.html', controller: 'ArtistsListCtrl'});
        $routeProvider.when('/events', {templateUrl: './partials/events.html', controller: 'EventsListCtrl'});
        $routeProvider.when('/news', {templateUrl: './partials/news.html', controller: 'NewsListCtrl'});
        $routeProvider.when('/home', {templateUrl: './partials/home.html', controller: 'HomeCtrl'});
        $routeProvider.when('/festival', {templateUrl: './partials/festival.html', controller: 'FestivalCtrl'});
        $routeProvider.when('/info', {templateUrl: './partials/info.html', controller: 'InfoListCtrl'});
        $routeProvider.when('/locations', {templateUrl: './partials/locations.html', controller: 'LocationsListCtrl'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
