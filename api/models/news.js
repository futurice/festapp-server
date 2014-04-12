var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: String,
  image: String,
  teaser_text: String,
  content: String,
  time: Date,
  status: String
});

module.exports = mongoose.model('News', newsSchema);
