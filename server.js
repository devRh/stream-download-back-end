var express = require('express'),
  app = express(),
  port = process.env.PORT || 5555,
  mongoose = require('mongoose'),
  TaxiTrips = require('./api/models/taxiTripModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://rh.rh:zefzvdnhvzdv123148vsd5sko@ds135952.mlab.com:35952/taxi-trip',{ useNewUrlParser: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/taxiTripRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('taxi trip RESTful API server started on: ' + port);