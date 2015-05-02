var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer()
  , port = process.env.PORT || 3000;

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


// Routes
app.get('/', routes.index);


app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
