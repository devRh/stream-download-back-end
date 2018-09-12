require('dotenv').config({path: './.env.development.local'});
require('./api/models/taxiTripModel');  

var cors = require('cors');
var express = require('express'),
  app = express(),
  port = process.env.PORT,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

app.use(cors())  

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/taxiTripRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('taxi trip RESTful API server started on: ' + port);

