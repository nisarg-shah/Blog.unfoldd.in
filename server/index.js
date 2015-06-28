var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    cors            = require('cors'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override'),
    jwt             = require('express-jwt'),
    config          = require('./config'),
    _               = require('lodash');



// Create the application.
var app = express();



// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());


// CORS Support
app.use(function(err, req, res, next) {
   if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler())
}

//------------- Fetch jwt secret ---------------

var jwtCheck = jwt({
  secret: config.secret
});

app.use(require('./routes/user-routes', jwtCheck));


// Connect to MongoDB
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./models/index');

  // Load the routes.
  var routes = require('./routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

/*  console.log('Listening on port 3000...');
  app.listen(3000);*/
});