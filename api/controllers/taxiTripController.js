'use strict';

var mongoose = require('mongoose'),

TaxiTrips = mongoose.model('TaxiTrips');

exports.readOneTaxiTrip = function (req, res) {
  TaxiTrips.findById(req.params.taxiTripId, function (err, taxiTrip) {
    if (err)
      res
      .status(404)
      .json({ message: "No valid entry found for Taxi trip ID" });

    res.json(taxiTrip);
  }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
  });
};

exports.paginationTaxiTrips = function (req, res) {

  var condition = {};
  var option = {};

  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)

  var sortByPickUpLocation = parseInt(req.query.sortByPickUpLocation)

  if ((sortByPickUpLocation == 1) || (sortByPickUpLocation == -1)) {
    option.sort = {};
    option.sort.PULocationID = sortByPickUpLocation
  }

  if (typeof(req.query.filterByVendorID) == 'string') {
    var filterByVendorID = req.query.filterByVendorID;
    if (filterByVendorID.trim().length !== 0) {
      condition.VendorID = filterByVendorID;
    }
  }
  
  if (pageNo <= 0) {
    res
    .status(404)
    .json({ message: "No valid entry found for provided ID" });
  }

  option.skip = size * (pageNo - 1)
  option.limit = size


  TaxiTrips.count(condition, function (err, totalCount) {
    if (err) {
      res
      .status(404)
      .json({ message: "Error fetching data" });
    }
    TaxiTrips.find(condition, {}, option, function (err, data) {
      if (err) {
        res
        .status(404)
        .json({ message: "Error fetching data" });
      } else {
        res.status(200).json({ "count": totalCount, data });
      }
    });
  }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
  });
};


