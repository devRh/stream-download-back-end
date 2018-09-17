'use strict';

  var taxiTrip = require('../controllers/taxiTripController');
  var express = require("express");
  var router = express.Router();
  // taxiTrip Routes
  

  router.get("/taxiTrips", taxiTrip.paginationTaxiTrips);

  router.get("/taxiTrips/:taxiTripId", taxiTrip.readOneTaxiTrip);



  module.exports = router;
