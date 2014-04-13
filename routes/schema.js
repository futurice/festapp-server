var _s = require('underscore.string')
  , _ = require('lodash')
  ,  Artist = require('../api/models/artist')
  , Info = require('../api/models/info')
  , News = require('../api/models/news')
  , Event = require('../api/models/event')
  , Location = require('../api/models/location')
  , Festival = require('../api/models/festival')
;

var modelMap = {
  'artist': Artist,
  'info': Info,
  'news': News,
  'event': Event,
  'location': Location,
  'festival': Festival
};

module.exports = function(app, apiVersion) {
  app.get('/api' + apiVersion + '/schema/:model', function(req, res) {
    var schema = modelMap[req.params.model].schema.tree;
    var props = Object.keys(schema);
    var publicSchema = {};
    props.forEach(function(val) {
      // Remove unwanted property
      if (!_s.startsWith(val, '_')) {
        // Detect whether the values constructor is of type Array
        if (_.isArray(schema[val])) {
          publicSchema[val] = [schema[val][0].name]; // To inform the calling party what type of an array this is, we get the array's first member, which happens to bo the constructor for the inner type
        } else if (_.isPlainObject(schema[val])) {
          if (typeof schema[val].type === 'undefined') {
            publicSchema[val] = {};
            for (var prop in schema[val]) {
              publicSchema[val][prop] = schema[val][prop].name;
            }
          } else {
            publicSchema[val] = schema[val].type.name;
          }
        } else {
          publicSchema[val] = schema[val].name;
        }
      }
    });
    res.json(publicSchema);
  });
}
