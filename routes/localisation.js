var redis = require('redis-url').connect(process.env.REDISCLOUD_URL);

redis.on('error', function (err) {
  console.error('Redis server cannot be reachead: ' + err);
});

module.exports = function(app, apiVersion) {
  
  app.get('/api'+apiVersion+'/localisation/:key', function(req, res) {
    var cb = function(res, object) { res.json(object); }.bind(null, res);
    redis.get(req.params.key, function(err, val) {
      if (err) {
        cb({error: 'Error while fetching key: ' + err});
      } else if (val) {
        cb({value: val});
      } else {
        cb({error: 'Key does not exist: ' + req.params.key});
      }
    });
  });

  app.post('/api'+apiVersion+'/localisation', function(req, res, next) {
    redis.set(req.body.key, req.body.val, function(err) {
      if(err) {
        next(err);
      }
    });
    res.status(200);
    res.json({success: 'Localisation added'});
  });
}
