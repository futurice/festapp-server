var express = require('express');
var http = require('http');
var url = require('url');

var middleware = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  res.type('application/json; charset=utf-8').sendfile('data'+pathname+'.json');
};


/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};


var app = express()
  .use('/api', middleware)
  .use('/admin', express.static(__dirname + '/admin'))
  .use('/public', express.static(__dirname + '/public'));

var port = Number(process.env.PORT || 8080);
http.createServer(app).listen(port);
console.log('Running at port '+port);
