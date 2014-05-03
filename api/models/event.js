var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: { type: String, default: '' },
  start_time: Date,     // jshint ignore:line
  end_time: Date,       // jshint ignore:line
  location: String,
  description: String,
  artists: [String],
  starred_count: Number // jshint ignore:line
});

module.exports = mongoose.model('Event', EventSchema);
