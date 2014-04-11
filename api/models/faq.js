var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var faqSchema = new Schema({
  title: String,
  cover_image: String,
  content: String,
  place: Number
});

module.exports = mongoose.model('Faq', faqSchema);
