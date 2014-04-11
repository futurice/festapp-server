var express = require('express');
var http = require('http');
// var url = require('url');
var restify = require('express-restify-mongoose');
var mongoose = require('mongoose');

var Artist = require('./api/models/artist');
var Faq = require('./api/models/faq');
var News = require('./api/models/news');
var Program = require('./api/models/program');
var Stage = require('./api/models/stage');

var mongourl = process.env.MONGOLAB_URI || 'mongodb://localhost/festapp-dev';
mongoose.connect(mongourl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Yay');
});

var twitter = require('./lib/twitter');
var twatter = new twitter.twitter(process.env.TWITTER_API_KEY, process.env.TWITTER_SECRET);
twatter.authenticate(function(success) {
  if (!success) {
    console.error("Authentication failed");
  }
})
var app = express();

app.use('/api/twitter/search/:search/:count?',  twitter.twitter.createHandler(twatter, 'search'))
  .use('/api/twitter/user/:userSearch/:count?', twitter.twitter.createHandler(twatter, 'userSearch'))
  .use('/api/twitter/hashtag/:hashtag/:count?', twitter.twitter.createHandler(twatter, 'hashtag'))
app.use('/public', express.static(__dirname + '/public'));

restify.serve(app, Artist);
restify.serve(app, Faq);
restify.serve(app, News);
restify.serve(app, Program);
restify.serve(app, Stage);



var port = Number(process.env.PORT || 8080);
http.createServer(app).listen(port);
console.log('Running at port '+port);
