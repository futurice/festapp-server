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
var adminUser = 'admin';
var adminPassword = process.env.ADMIN_PASSWORD || 'admin';
// Accounts which may do POST and PUT -requests to api
var accounts = [adminUser+':'+adminPassword];
var accessFilter = require('./lib/access_filter');

var app = express();

app.use(logger('short'));
app.use(bodyParser());
app.use('/api', accessFilter.authAPI(accounts, apiVersion));
app.use('/public', express.static(__dirname + '/public'));
app.use('/admin', accessFilter.authAdminUI(accounts));
app.use('/admin', express.static(__dirname + '/admin'));

routes(app, apiVersion);

var port = Number(process.env.PORT || 8080);
http.createServer(app).listen(port);
console.log('Running at port '+port);

module.exports = app;
