var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StageSchema = new Schema({
  name: { type: String, default: '' },
  x: Number,
  y: Number,
  width: Number,
  height: Number
});

module.exports = mongoose.model('Stage', StageSchema);
