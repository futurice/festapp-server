module.exports = function(app, apiVersion) {
  app.get('/api', function(req,res) {
    var routes = app._router.stack.map(function(route) { return route.route ? route.route : route;});
    var paths = [];
    routes.forEach(function(route) {
      if (route.methods) {
        Object.keys(route.methods).forEach(function(method) {
          paths.push(method.toUpperCase() +' ' + route.path);
        });
      }
    });
    res.json(paths);
  });
};
