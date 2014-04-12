var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: { type: String, default: '' },
  start_time: Date,
  end_time: Date,
  location: String,
  description: String,
  artists: [String],
  starred_count: Number
});

module.exports = mongoose.model('Event', EventSchema);
