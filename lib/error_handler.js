var fs;
try {
  fs = require('graceful-fs');
} catch (_) {
  fs = require('fs');
}

var env = process.env.NODE_ENV || 'development';

module.exports = function errorHandler(err, req, res, next) {
  if (err.status) {
    res.statusCode = err.status;
  }
  if (res.statusCode < 400) {
    res.statusCode = 500;
  }
  if ('test' !== env) {
    console.error('Error handler: ' + err.stack);
  }
  console.log(err);
  if ('production' === env) {
    delete err.stack;
  }

  var error = { message: err.message, stack: err.stack };
  for (var prop in err) {
    error[prop] = err[prop];
  }
  var json = JSON.stringify({ error: error });
  res.setHeader('Content-Type', 'application/json');
  res.end(json);
};
