var Weather = require('../lib/weather');

module.exports = function(app, apiVersion) {
  app.get('/api' + apiVersion + '/weather/:city/:timestamp?', Weather.weather);
}
