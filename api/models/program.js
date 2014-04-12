var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var programSchema = new Schema({
  title: String,
  cover_image: String,
  content: String,
  place: Number
});

module.exports = mongoose.model('Program', programSchema);
