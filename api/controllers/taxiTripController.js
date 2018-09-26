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
  console.log(pageNo);
  var size = parseInt(req.query.size)

  var sortByPickUpLocation = parseInt(req.query.sortByPickUpLocation)

  if ((sortByPickUpLocation == 1) || (sortByPickUpLocation == -1)) {
    option.sort = {};
    option.sort.PULocationID = sortByPickUpLocation
  }

  if (typeof (req.query.filterByVendorID) == 'string') {
    var filterByVendorID = req.query.filterByVendorID;
    if (filterByVendorID.trim().length !== 0) {
      condition.VendorID = filterByVendorID;
    }
  }

  if (pageNo <= 0) {
    res
      .status(404)
      .json({ message: "No valid entry found for page number" });
  }

  if (size <= 0) {
    res
      .status(404)
      .json({ message: "No valid entry found for page size" });
  }

  option.skip = size * (pageNo - 1)
  option.limit = size;

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


exports.allTaxiTripDownload = function (req, res) {
  let cursorCount = 0;
  const cursor = TaxiTrips.find({}, {}, { limit: 100000 }).lean().cursor();
  res.header("Content-Disposition", "attachment; filename=\"data.xls\"");
  cursor.on('data', (obj) => {
    cursorCount = cursorCount + 1;
    if ((obj) && (cursorCount != 1)) {
      res.write(
        obj.VendorID
        + ","
        + obj.PULocationID
        + ","
        + obj.DOLocationID
        + "\n"
      );
      null
    } else if ((obj) && (cursorCount == 1)) {
      res.write(
        "Vendor-id"
        + ","
        + "Pick-up location"
        + ","
        + "Drop-off location"
        + "\n"
      );
      res.write(
        obj.VendorID
        + ","
        + obj.PULocationID
        + ","
        + obj.DOLocationID
        + "\n"
      );
    }
  }
  )
  cursor.on('close', () => {
    console.log(cursorCount);
    res.status(200).end();
  });

};




