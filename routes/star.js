module.exports = function(app, apiVersion) {
  app.post('/api' + apiVersion + '/events/:event_id/star', function(req, res) {
    var user_id = req.body.user_id;
    var event_id = req.params.event_id;
    if (!user_id) {
      res.json(500, {error: 'user_id not set'});
      return;
    }
    var starred_key = 'star_' + user_id + '_' + event_id;
    redis.get(starred_key, function(err, val) {
      if (err) {
        res.json(500, {error: 'Error fetching key: ' + err});
        return;
      } else if (val) {
        res.json(500, {error: 'User ' + user_id + ' has already starred event ' + event_id});
        return;
      }
      Event.findById(event_id, function(err, event) {
        if (err) {
          res.json(500, {error: 'Error fetching event: ' + err});
        } else if (event) {
          redis.set(starred_key, true);
          var stars = event.starred_count;
          event.starred_count = (stars || 0) + 1;
          event.save();
          res.json({success: 'Event starred successfully.'});
        } else {
          res.json(404, {error: 'Event ' + event_id + ' not found!'});
        }
      });
    });
  });
}
