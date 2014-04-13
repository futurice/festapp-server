// Only allow GET, OPTIONS and HEAD-requests to /api-calls without HTTP Basic authentication
module.exports = function(accounts, apiVersion) {
  return function accessFilter(req, res, next) {
    var matchStar = new RegExp(apiVersion+'/events/\\w+/star.*').test(req.path);
    if (req.method === 'GET' || req.method === 'OPTIONS' || req.method === 'HEAD' || matchStar) {
      next();
    } else {
      if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0) {
        if (accounts.indexOf(new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString()) !== -1) {
          next();
        } else {
          res.header('WWW-Authenticate', 'Basic realm="festapp-server"');
          res.send('Wrong username or password', 401);
        }
      } else {
        res.header('WWW-Authenticate', 'Basic realm="festapp-server"');
        res.send(401);
      }
    }
  };
};
