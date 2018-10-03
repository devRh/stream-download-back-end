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
    res.status(500).json({ error: err });
  });
};


exports.allTaxiTripDownload = function (req, res) {
  res.setHeader("Content-Disposition", "attachment; filename=\"data.xls\"");
  res.setHeader('Transfer-Encoding', "chunked");
  let limitEst = 10
  TaxiTrips.find({}, { _id: 0, VendorID: 1, PULocationID: 1, DOLocationID: 1 })
    .limit(limitEst)
    .lean()
    .exec(function (err, docs) {
      let estimate = Math.ceil(((docs.reduce((acc, doc) => {
        return acc + Buffer.byteLength(Object.values(doc).join(""), 'utf8');
      }, 0)) +
        (Object.keys(docs[0]).length * limitEst)) / limitEst);
      TaxiTrips.count((err, totalCount) => {
        let contentLength = String(totalCount * estimate);
        res.setHeader('Content-Length', contentLength);
        res.write(
          "Vendor-id"
          + ","
          + "Pick-up location"
          + ","
          + "Drop-off location"
          + "\n"
        );
        const cursor = TaxiTrips.find({}, { _id: 0, VendorID: 1, PULocationID: 1, DOLocationID: 1 }).lean().cursor();
        cursor.on('data', (obj) => {
          res.write(
            obj.VendorID
            + ","
            + obj.PULocationID
            + ","
            + obj.DOLocationID
            + "\n"
          );
        }
        )
        cursor.on('close', () => {
          res.status(200).end();
        });
      })
    })
};



