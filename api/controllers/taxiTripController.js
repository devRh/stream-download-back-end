'use strict';

var mongoose = require('mongoose'),

TaxiTrips = mongoose.model('TaxiTrips');

exports.readOneTaxiTrip = function (req, res) {
  TaxiTrips.findById(req.params.taxiTripId, function (err, taxiTrip) {
    if (err)
      res.send(err);
    res.json(taxiTrip);
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

  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response)
  }

  option.skip = size * (pageNo - 1)
  option.limit = size


  TaxiTrips.count(condition, function (err, totalCount) {
    if (err) {
      var response = { "error": true, "message": "Error fetching data" }
      return res.json(response);
    }
    TaxiTrips.find(condition, {}, option, function (err, data) {
      if (err) {
        var response = { "error": true, "message": "Error fetching data" };
      } else {
        var response = { "count": totalCount, data };
      }
      res.json(response);
    });
  });
};


