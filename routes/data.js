var restify = require('express-restify-mongoose');
var Artist = require('../api/models/artist');
var Info = require('../api/models/info');
var News = require('../api/models/news');
var Event = require('../api/models/event');
var Location = require('../api/models/location');
var Festival = require('../api/models/festival');
var Localise = require('../lib/localise');

module.exports = function(app, apiVersion) {
  restify.defaults({
    outputFn: Localise.localiseApiCallResult,
    version: apiVersion,
    private: '__v'
  });

  restify.serve(app, Artist);
  restify.serve(app, Info, { plural: false });
  restify.serve(app, News);
  restify.serve(app, Event);
  restify.serve(app, Location);
  restify.serve(app, Festival, { plural: false });
};
