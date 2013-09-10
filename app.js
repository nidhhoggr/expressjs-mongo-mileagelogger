
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , connect = require('connect')
  , engine = require('ejs-locals')
  ;

var app = module.exports = express.createServer(); 

require('./db'); 

var Routes = {
    main: require('./routes'),
    trip: require('./routes/trip'),
    trip_location: require('./routes/trip_location')
}

app.configure(function(){
  app.engine('ejs', engine);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(Routes.main.user_cookie);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', Routes.main.index);

app.get('/trip/', Routes.trip.index);
app.get('/trip/delete/:id', Routes.trip.destroy);
app.post('/trip/create', Routes.trip.create);
app.get('/trip/add', Routes.trip.add);
app.get('/trip/edit/:id', Routes.trip.edit); 
app.post('/trip/update/:id', Routes.trip.update); 

app.get('/trip_location/', Routes.trip_location.index);
app.get('/trip_location/delete/:id', Routes.trip_location.destroy);
app.post('/trip_location/create', Routes.trip_location.create);
app.get('/trip_location/add', Routes.trip_location.add);
app.get('/trip_location/edit/:id', Routes.trip_location.edit);
app.post('/trip_location/update/:id', Routes.trip_location.update);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
