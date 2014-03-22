var express = require('express');

var http = require('http');
var url = require('url');
var fs = require('fs');

var supported = ['faq', 'artists', 'news', 'info', 'program', 'general', 'services', 'arrival'];
var middleware = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var regex = new RegExp("^\\/("+supported.join("|")+")$");
  var matched = pathname.match(regex);
  if (matched) {
    res.type('application/json; charset=utf-8').sendfile('data/'+matched[1]+'.json');
  } else {
    res.writeHead(404, 'Requested resource not found');
    res.end('Not Found');
  }
};

var app = express().use('/api', middleware);
var port = Number(process.env.PORT || 8080);
app.use('/public', express.static(__dirname + '/public'));
http.createServer(app).listen(port);
