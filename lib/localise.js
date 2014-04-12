var redis = require('redis-url').connect(process.env.REDISCLOUD_URL);
var after = require('after');
var url = require('url');

var General = require('./general');

var Localise = {};

Localise.localizeStrings = function(lang, cb, object) {
  var keys = Object.keys(object);
  var next = after(keys.length, cb);
  keys.forEach(this.localizeObjectField.bind(null, object, next, lang));
};

Localise.localizeObjectField = function(object, next, lang, key) {
  redis.get([key, object[key], object.constructor.name, lang].join('-'), function(err, reply) {
    if(err) {
      console.error('Error while accessing redis with key: ' + [key, object[key], object.constructor.name, lang].join('-'));
    } else if(reply) {
      object[key] = reply;
    }
    next(err, object);
  });
};

Localise.localiseApiCallResult = function(res, result) {
  var urlParts = url.parse(res.req.originalUrl, true);
  var lang = urlParts.query.lang;
  var cb = General.sendResult.bind(null, res);
  if (typeof lang !== 'undefined') {
    if (result instanceof Array) {
      var next = after(result.length, cb);
      result.forEach(function(val, ind) {
        var cb2 = General.updateArr.bind(null, ind, result, next);
        Localise.localizeStrings(lang, cb2, val);
      });
    } else {
      Localise.localizeStrings(lang, cb, result);
    }
  } else {
    cb(null, result);
  }
};

module.exports = Localise;
