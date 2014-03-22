var http = require('http');
var url = require('url');
var fs = require('fs');

var supported = ['artistit', 'uutiset', 'info', 'ohjelma', 'general', 'services', 'arrival'];

var server = http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var regex = new RegExp("^\\/api\\/("+supported.join("|")+")$");
  var matched = pathname.match(regex);
  if (matched) {
    fs.readFile('data/'+matched[1]+'.json', function(err, data) {
      if (err) {
        res.writeHead(500, 'Internal server error');
        res.end('Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, 'Requested resource not found');
    res.end('Not Found');
  }
});

var port = Number(process.env.PORT || 8080);
server.listen(port);
