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
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'ArtistsListCtrl'});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'ArtistsListCtrl'});
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
