var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var LocationSchema = new Schema({
  name: { type: String, default: '', unique: true },
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  type: String,
  description: String
});

LocationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Location', LocationSchema);
