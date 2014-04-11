var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: { type: String, default: '' },
  picture: String,
  quote: String,
  content: String,
  featured: String,
  status: String,
  stage: String,
  day: String,
  time_start: Date,
  time_stop: Date,
  founded: Number,
  genre: String,
  members: [String],
  albums: [String],
  highlights: String,
  youtube: String,
  spotify: String,
  contact_info: String,
  press_image: String,
  credits: String,
  place: Number
});

module.exports = mongoose.model('Artist', ArtistSchema);
