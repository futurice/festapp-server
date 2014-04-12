var mongoose = require('mongoose');
var fs = require('fs');

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
db.once('open', function callback () {
  console.log("Yay");
});

fs.readFile('./data/artists.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new Artist(item).save();
  });
});

fs.readFile('./data/faq.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new Faq(item).save();
  });
});

fs.readFile('./data/news.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new News(item).save();
  });
});

fs.readFile('./data/program.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new Program(item).save();
  });
});

fs.readFile('./data/stages.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new Stage(item).save();
  });
});

fs.readFile('./data/festival.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var item = JSON.parse(data);
  new Festival(item).save();

});

db.close();

console.log("Import done");
