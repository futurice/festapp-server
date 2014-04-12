'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

var myAppServices = angular.module('myApp.services', ['ngResource']).value('version', '0.1');

myAppServices.factory('Artist', ['$resource',
    function($resource){
        return $resource('../api/v1/artists/:artistId', {artistId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('Event', ['$resource',
    function($resource){
        return $resource('../api/v1/events/:eventId', {eventId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('News', ['$resource',
    function($resource){
        return $resource('../api/v1/news/:newsItemId', {newsItemId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('Location', ['$resource',
    function($resource){
        return $resource('../api/v1/locations/:locationId', {locationId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('Info', ['$resource',
    function($resource){
        return $resource('../api/v1/info/:infoItemId', {infoItemId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('Festival', ['$resource',
    function($resource){
        return $resource('../api/v1/festival/:festivalId', {festivalId: '@id'}, {update: {method:"PUT"}});
    }]);