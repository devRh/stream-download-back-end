'use strict';

var taxiTrip = require('../controllers/taxiTripController');
var express = require("express");
var router = express.Router();

router.get("/taxiTrips", taxiTrip.paginationTaxiTrips);

router.get("/taxiTrips/download", taxiTrip.allTaxiTripDownload);// in heroku taxitrips

router.get("/taxiTrips/:taxiTripId", taxiTrip.readOneTaxiTrip);



module.exports = router;
