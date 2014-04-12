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
        $routeProvider.when('/news', {templateUrl: './partials/news.html', controller: 'NewsListCtrl'});
        $routeProvider.otherwise({redirectTo: '/news'});
    }]);
