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
        return $resource('../api/v1/events', {}, {
            query: {method:'GET', params: {eventId:'events'}, isArray:true}
        });
    }]);

myAppServices.factory('News', ['$resource',
    function($resource){
        return $resource('../api/v1/news', {}, {
            query: {method:'GET', params: {eventId:'news'}, isArray:true}
        });
    }]);
myAppServices.factory('Locations', ['$resource',
    function($resource){
        return $resource('../api/v1/locations', {}, {
            query: {method:'GET', params: {eventId:'locations'}, isArray:true}
        });
    }]);

myAppServices.factory('Info', ['$resource',
    function($resource){
        return $resource('../api/v1/info', {}, {
            query: {method:'GET', params: {eventId:'info'}, isArray:true}
        });
    }]);

myAppServices.factory('Festival', ['$resource',
    function($resource){
        return $resource('../api/v1/festival', {}, {
            query: {method:'GET', params: {eventId:'festival'}, isArray:true}
        });
    }]);