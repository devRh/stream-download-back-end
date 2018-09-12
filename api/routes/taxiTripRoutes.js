'use strict';
module.exports = function(app) {
  var taxiTrip = require('../controllers/taxiTripController');

  // taxiTrip Routes
  
  app.route('/taxiTrips')
    .get(taxiTrip.paginationTaxiTrips)   
  
  app.route('/taxiTrips/:taxiTripId')
    .get(taxiTrip.readOneTaxiTrip)
 
  //default routes  

  app.route('/').get((req, res, next) => {
      res.send('server start on : "/" route')
  });  

  app.route('*').get((req, res, next) => {
    res.redirect('/');
  });

};