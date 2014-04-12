var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StageSchema = new Schema({
  name: { type: String, default: '' },
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  type: String
});

StageSchema.statics.types = {
  stage: 'STAGE',
  tent: 'TENT',
  indoor: 'INDOOR'
};

var Stage = mongoose.model('Stage', StageSchema);

module.exports = Stage;
