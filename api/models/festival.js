var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FestivalSchema = new Schema({
  name: { type: String, default: '' },
  organizer: String,
  sponsors: [String],
  start_date: Date,
  end_date: Date,
  city: String,
  country: String,
  coordinates: {
    lat: Number,
    lon: Number
  },
  content: Schema.Types.Mixed
});

module.exports = mongoose.model('Festival', FestivalSchema);
