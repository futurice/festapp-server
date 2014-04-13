var request = require('request');
var cache = require('memory-cache');

module.exports = {

  rotten: function(req, res) {

    var query = req.param("query");
    var cached = cache.get(query);
    var api_key = process.env.ROTTEN_KEY;

    if(cached){
      res.type('application/json; charset=utf-8').end(JSON.stringify(cached));
    } else {
      var url = ['http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=', api_key, '&q=', query, '&page_limit=1'].join('');

      request(url, function (error, response, body) {      
        var data = JSON.parse(body);

        if (!error && response.statusCode == 200 && data.total > 0) {
          cache.put(query, data, 1000*3600);
        } 
        res.type('application/json; charset=utf-8').end(JSON.stringify(data));
      }); 
    }

  }
}
