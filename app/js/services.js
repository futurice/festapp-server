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
        return $resource('../api/v1/event/:eventId', {eventId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('News', ['$resource',
    function($resource){
        return $resource('../api/v1/News/:newsId', {newsId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('Locations', ['$resource',
    function($resource){
        return $resource('../api/v1/location/:locationId', {locationId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('Info', ['$resource',
    function($resource){
        return $resource('../api/v1/info/:infoId', {infoId: '@id'}, {update: {method:"PUT"}});
    }]);

myAppServices.factory('Festival', ['$resource',
    function($resource){
        return $resource('../api/v1/festival/:festivalId', {festivalId: '@id'}, {update: {method:"PUT"}});
    }]);