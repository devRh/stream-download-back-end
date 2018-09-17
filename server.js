require('dotenv').config({path: './.env.development.local'});
require('./api/models/taxiTripModel');  

var taxiTripRoutes = require('./api/routes/taxiTripRoutes'); //importing route
var cors = require('cors');
var morgan = require('morgan');
var express = require('express'),
  app = express(),
  port = process.env.PORT,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

app.use(cors())  
app.use(morgan("dev"));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(taxiTripRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


app.listen(port);


console.log('taxi trip RESTful API server started on: ' + port);

