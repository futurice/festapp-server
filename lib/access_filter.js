var FESTAPP_REALM = 'Basic realm="festapp-server"';

function validateBasicAuth(accounts, req, res, next) {
  if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0) {
    if (accounts.indexOf(new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString()) !== -1) {
      next();
    } else {
      res.header('WWW-Authenticate', FESTAPP_REALM);
      res.send('Wrong username or password', 401);
    }
  } else {
    res.header('WWW-Authenticate', FESTAPP_REALM);
    res.send(401);
  }
}

module.exports = {
  authAPI: function(accounts, apiVersion) {
    // Only allow GET, OPTIONS and HEAD-requests to /api-calls without
    // HTTP Basic authentication
    return function accessFilter(req, res, next) {
      var matchStar = new RegExp(apiVersion+'/events/\\w+/star.*').test(req.path);
      if (req.method === 'GET' || req.method === 'OPTIONS' || req.method === 'HEAD' || matchStar) {
	next();
      } else {
	validateBasicAuth(accounts, req, res, next);
      }
    };
  },

  authAdminUI: function(accounts) {
    return function(req, res, next) {
      validateBasicAuth(accounts, req, res, next);
    };
  }
};
