var mongoose = require('mongoose');
var fs = require('fs');

var Artist = require('./api/models/artist');
var Event = require('./api/models/event');
var Festival = require('./api/models/festival');
var Info = require('./api/models/info');
var Location = require('./api/models/location');
var News = require('./api/models/news');

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
    new Artist(item).save(console.log);
  });
});

fs.readFile('./data/events.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new Event(item).save(console.log);
  });
});

fs.readFile('./data/festival.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var item = JSON.parse(data);
  new Festival(item).save(console.log);
});

fs.readFile('./data/info.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new Info(item).save(console.log);
  });
});

fs.readFile('./data/location.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new Location(item).save(console.log);
  });
});

fs.readFile('./data/news.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var items = JSON.parse(data);
  items.forEach(function(item) {
    new News(item).save(console.log);
  });
});

setTimeout(function closeDbConn() {
  db.close();
  console.log("Import done");
}, 3000);
