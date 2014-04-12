var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: String,
  image: String,
  teaser_text: String,
  content: String,
  time: Date,
  status: Boolean
});

module.exports = mongoose.model('News', newsSchema);
