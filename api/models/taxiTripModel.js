'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaxiTripSchema = new Schema({
  id: {
    type: Object
  },
  VendorID: {
    type: Number,
    required: 'enter VendorID'
  },
  tpep_pickup_datetime: {
    type: Date,
    default: Date.now
  },
  tpep_dropoff_datetime: {
    type: Date,
    default: Date.now
  },
  passenger_count: {
    type: Number,
    default: null
  },
  trip_distance: {
    type: Number,
    default: null
  },
  RatecodeID: {
    type: Number,
    required: true
  },
  store_and_fwd_flag: {
    type: String,
    default: null
  },
  PULocationID: {
    type: Number,
    default: null
  },
  DOLocationID: {
    type: Number,
    default: null
  },
  payment_type: {
    type: Number,
    default: null
  },
  fare_amount: {
    type: Number,
    default: null
  },
  extra: {
    type: Number,
    default: null
  },
  mta_tax: {
    type: Number,
    default: null
  },
  tip_amount: {
    type: Number,
    default: null
  },
  tolls_amount: {
    type: Number,
    default: null
  },
  improvement_surcharge: {
    type: Number,
    default: null
  },
  total_amount: {
    type: Number,
    default: null
  },

}, { collection: 'yellowTaxiTripData' });
  //  testFor100Docs

module.exports = mongoose.model('TaxiTrips', TaxiTripSchema);




