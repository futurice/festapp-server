var express = require('express');
var http = require('http');
var url = require('url');

var middleware = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  res.type('application/json; charset=utf-8').sendfile('data'+pathname+'.json');
};

var instagram = require('./lib/instagram');

var app = express()
  .use('/api/instagram', instagram.tagMedia)
  .use('/api', middleware)
  .use('/public', express.static(__dirname + '/public'));

var port = Number(process.env.PORT || 8080);
http.createServer(app).listen(port);
console.log('Running at port '+port);
