var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InfoSchema = new Schema({
  title: String,
  image: String,
  content: String,
  place: Number
});

module.exports = mongoose.model('Info', InfoSchema);
