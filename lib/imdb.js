var imdb = require('imdb-api');
var request = require('request');
var cache = require('memory-cache');

module.exports = {

  imdb: function(req, res) {

    var query = req.param("query");
    var cached = cache.get(query);
    var result;

    if(cached) {
      console.log('cached: ' + cached.title);
      res.type('application/json; charset=utf-8').end(JSON.stringify(cached));
    } else {
      imdb.getReq({ name: query }, function(err, things) {
        result = things;
        cache.put(query, result, 1000*3600);
        res.type('application/json; charset=utf-8').end(JSON.stringify(result));
      });
    }
  }
}