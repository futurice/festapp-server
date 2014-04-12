var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: { type: String, default: '' },
  picture: String,
  quote: String,
  content: String,
  featured: Boolean,
  status: Boolean,
  stage: String,
  founded: Number,
  genres: [String],
  members: [String],
  albums: [String],
  highlights: [String],
  youtube: String,
  spotify: String,
  contact_info: String,
  press_image: String,
  credits: String,
  place: Number
});

module.exports = mongoose.model('Artist', ArtistSchema);
