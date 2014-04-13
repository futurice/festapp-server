var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./routes');
var mongoose = require('mongoose');

var mongourl = process.env.MONGOLAB_URI || 'mongodb://localhost/festapp-dev';
mongoose.connect(mongourl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var apiVersion = '/v1';

// Accounts which may do POST and PUT -requests to api
var accounts = ['admin:admin'];

// Only allow GET, OPTIONS and HEAD-requests to /api-calls without HTTP Basic authentication
function accessFilter(req, res, next) {
  var matchStar = new RegExp(apiVersion+'/events/\\w+/star.*').test(req.path);
  if (req.method == 'GET' || req.method == 'OPTIONS' || req.method == 'HEAD' || matchStar) {
    next();
  } else {
    if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0) {
      if (accounts.indexOf(new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString()) !== -1) {
        next();
      } else {
        res.header('WWW-Authenticate', 'Basic realm="festapp-server"');
        res.send('Wrong username or password', 401);
      }
    } else {
      res.header('WWW-Authenticate', 'Basic realm="festapp-server"');
      res.send(401);
    }
  }
}

var app = express();

app.use(logger('short'));
app.use('/api', accessFilter);
app.use(bodyParser());

app.use('/public', express.static(__dirname + '/public'));

routes(app, apiVersion);

var port = Number(process.env.PORT || 8080);
http.createServer(app).listen(port);
console.log('Running at port '+port);

module.exports = app;
