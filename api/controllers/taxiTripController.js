'use strict';


var mongoose = require('mongoose'),
TaxiTrips = mongoose.model('TaxiTrips'),
ObjectId = require('mongoose').Types.ObjectId; 
  

exports.list_all_taxiTrips = function(req, res) {
    TaxiTrips.find({}, function(err, taxiTrip) {
    if (err)
      res.send(err);
    res.json(taxiTrip);
  });
};


exports.read_a_taxiTrip = function(req, res) {
  TaxiTrips.findById( new ObjectId(req.params.taxiTripId), function(err, taxiTrip) {
    if (err)
      res.send(err);
    res.json(taxiTrip);
  });
};


exports.pagination_taxiTrips = (req, res) => {
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
    // Find some documents
  TaxiTrips.count({},function(err,totalCount) {
    if(err) {
      var response = {"error" : true,"message" : "Error fetching data"}
    }
    TaxiTrips.find({},{},query,function(err,data) {
      // Mongo command to fetch all data from collection.
      if(err) {
        var response = {"error" : true,"message" : "Error fetching data"};
      } else {
        var totalPages = Math.ceil(totalCount / size)
        var response = {"pages": totalPages,data};
      }
      res.json(response);
    });
  });  
};

exports.filterByVendorID_taxiTrips = (req, res) => {
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var VendorID = parseInt(req.query.VendorID)
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
    // Find some documents
  if (VendorID){
    TaxiTrips.find({VendorID:VendorID},{},query,function(err,data) {
      // Mongo command to fetch all data from collection.
      if(err) {
        var response = {"error" : true,"message" : "Error fetching data"};
      } else {
        var response = {data};
      }
      res.json(response);
    });
  }else{
    TaxiTrips.find({},{},query,function(err,data) {
      // Mongo command to fetch all data from collection.
      if(err) {
        var response = {"error" : true,"message" : "Error fetching data"};
      } else {
        var response = {data};
      }
      res.json(response);
    });

  }  

};

exports.sortByVendorID_taxiTrips = (req, res) => {
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  query.sort = "VendorID"
    // Find some documents
  TaxiTrips.find({},{},query,function(err,data) {
    // Mongo command to fetch all data from collection.
    if(err) {
      var response = {"error" : true,"message" : "Error fetching data"};
    } else {
      var response = {data};
    }
    res.json(response);
  });

};

