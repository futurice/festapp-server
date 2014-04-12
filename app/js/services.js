'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

var myAppServices = angular.module('myApp.services', ['ngResource']).value('version', '0.1');

myAppServices.factory('Artist', ['$resource',
    function($resource){
        return $resource('../api/v1/artists/:artistId', {artistId: '@id'});
    }]);