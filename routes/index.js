var instagram = require('./instagram')
  , localisation = require('./localisation')
  , schema = require('./schema')
  , star = require('./star')
  , twitter = require('./twitter')
  , rotten = require('./rotten')
  , flickr = require('./flickr')
  , weather = require('./weather')
;

module.exports = function(app, apiVersion) {
  rotten(app);
  instagram(app, apiVersion);
  localisation(app, apiVersion);
  schema(app, apiVersion);
  star(app, apiVersion);
  twitter(app, apiVersion);
  flickr(app, apiVersion);
  weather(app, apiVersion);
}
