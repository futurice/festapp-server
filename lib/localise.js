var redis = require('redis-url').connect(process.env.REDISCLOUD_URL);
var afterjs = require('after');
var url = require('url');

var General = require('./general');

var Localise = {};

Localise.localizeStrings = function(lang, cb, object) {
  var keys = Object.keys(object);
  var next = afterjs(keys.length, cb);
  keys.forEach(this.localizeObjectField.bind(null, object, next, lang));
};

Localise.localizeObjectField = function(object, next, lang, key) {
  redis.get([key, object[key], object[key].constructor.name, lang].join('-'), function(err, reply) {
    if(err) {
      console.error('Error while accessing redis with key: ' + [key, object[key], object[key].constructor.name, lang].join('-'));
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
      var next = afterjs(result.length, cb);
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
