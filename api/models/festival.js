var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FestivalSchema = new Schema({
  name: { type: String, default: '' },
  organizer: String,
  sponsors: [String],
  start_date: Date,   // jshint ignore:line
  end_date: Date,     // jshint ignore:line
  city: String,
  country: String,
  coordinates: {
    lat: Number,
    lon: Number
  }
});

module.exports = mongoose.model('Festival', FestivalSchema);
