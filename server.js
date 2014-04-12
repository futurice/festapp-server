var express = require('express');
var http = require('http');
var restify = require('express-restify-mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

var redis = require('redis-url').connect(process.env.REDISCLOUD_URL);
var mongoose = require('mongoose');

var Localise = require('./lib/localise');

var Artist = require('./api/models/artist');
var Faq = require('./api/models/faq');
var News = require('./api/models/news');
var Program = require('./api/models/program');
var Stage = require('./api/models/stage');
var Festival = require('./api/models/festival');

var mongourl = process.env.MONGOLAB_URI || 'mongodb://localhost/festapp-dev';
mongoose.connect(mongourl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

redis.on('error', function (err) {
  console.error('Redis server cannot be reachead: ' + err);
});

var app = express();
app.use(logger('short'));
app.use(bodyParser());
app.use('/public', express.static(__dirname + '/public'));


app.get('/api/v1/localisation/:key', function(req, res) {
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

app.post('/api/v1/localisation', function(req, res) {
  redis.set(req.body.key, req.body.val);
  res.status(200);
  res.json({success: 'Localisation added'});
});

restify.defaults({
   outputFn: Localise.localiseApiCallResult
});

restify.serve(app, Artist);
restify.serve(app, Faq);
restify.serve(app, News);
restify.serve(app, Program);
restify.serve(app, Stage);
restify.serve(app, Festival);

var instagram = require('./lib/instagram');

app.use('/api/instagram/tag', instagram.tagMedia)
   .use('/api/instagram/user', instagram.userMedia);

var port = Number(process.env.PORT || 8080);
http.createServer(app).listen(port);
console.log('Running at port '+port);
