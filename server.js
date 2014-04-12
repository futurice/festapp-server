var express = require('express');
var http = require('http');
var restify = require('express-restify-mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

var redis = require('redis-url').connect(process.env.REDISCLOUD_URL);
var mongoose = require('mongoose');

var Localise = require('./lib/localise');

var Artist = require('./api/models/artist');
var Info = require('./api/models/info');
var News = require('./api/models/news');
var Event = require('./api/models/event');
var Location = require('./api/models/location');
var Festival = require('./api/models/festival');

var mongourl = process.env.MONGOLAB_URI || 'mongodb://festapp:festappi@oceanic.mongohq.com:10043/app24018204';
mongoose.connect(mongourl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

redis.on('error', function (err) {
  console.error('Redis server cannot be reachead: ' + err);
});

var apiVersion = '/v1';

// Only allow GET, OPTIONS and HEAD-requests to /api-calls
function accessFilter(req, res, next) {
  var matchStar = new RegExp(apiVersion+'/events/\\w+/star.*').test(req.path);
  if (req.method == 'GET' || req.method == 'OPTIONS' || req.method == 'HEAD' || matchStar) {
    next();
  } else {
    res.send(403);
  }
}

var app = express();
app.use(logger('short'));
//app.use('/api', accessFilter);
app.use(bodyParser());
app.use('/public', express.static(__dirname + '/public'));
app.use('/app', express.static(__dirname + '/app'));

app.get('/api'+apiVersion+'/localisation/:key', function(req, res) {
  var cb = function(res, object) { res.json(object); }.bind(null, res);
  redis.get(req.params.key, function(err, val) {
    if (err) {
      cb({error: 'Error while fetching key: ' + err});
    } else if (val) {
      cb({value: val});
    } else {
      cb({error: 'Key does not exist: ' + req.params.key});
    }
  });
});

app.post('/api'+apiVersion+'/localisation', function(req, res) {
  redis.set(req.body.key, req.body.val);
  res.status(200);
  res.json({success: 'Localisation added'});
});

app.post('/api' + apiVersion + '/events/:event_id/star', function(req, res) {
  var user_id = req.body.user_id;
  var event_id = req.params.event_id;
  if (!user_id) {
    res.json(500, {error: 'user_id not set'});
    return;
  }
  var starred_key = 'star_' + user_id + '_' + event_id;
  redis.get(starred_key, function(err, val) {
    if (err) {
      res.json(500, {error: 'Error fetching key: ' + err});
      return;
    } else if (val) {
      res.json(500, {error: 'User ' + user_id + ' has already starred event ' + event_id});
      return;
    }
    Event.findById(event_id, function(err, event) {
      if (err) {
        res.json(500, {error: 'Error fetching event: ' + err});
      } else if (event) {
        redis.set(starred_key, true);
        var stars = event.starred_count;
        event.starred_count = (stars || 0) + 1;
        event.save();
        res.json({success: 'Event starred successfully.'});
      } else {
        res.json(404, {error: 'Event ' + event_id + ' not found!'});
      }
    });
  });
});

restify.defaults({
   outputFn: Localise.localiseApiCallResult,
   version: apiVersion
});

restify.serve(app, Artist);
restify.serve(app, Info, { plural: false });
restify.serve(app, News);
restify.serve(app, Event);
restify.serve(app, Location);
restify.serve(app, Festival, { plural: false });

var instagram = require('./lib/instagram');

app.use('/api/instagram/tag', instagram.tagMedia)
   .use('/api/instagram/user', instagram.userMedia);

var port = Number(process.env.PORT || 8080);
http.createServer(app).listen(port);
console.log('Running at port '+port);

