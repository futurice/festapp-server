var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: { type: String, default: '' },
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  type: String,
  description: String
});

module.exports = mongoose.model('Location', LocationSchema);
