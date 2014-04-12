var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var ArtistSchema = new Schema({
  name: { type: String, default: '', unique: true },
  picture: String,
  quote: String,
  content: String,
  featured: Boolean,
  status: String,
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

ArtistSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Artist', ArtistSchema);
