'use strict';
module.exports = function(app) {
  var taxiTrip = require('../controllers/taxiTripController');

  // taxiTrip Routes


  
  app.route('/taxiTrips')
    .get(taxiTrip.pagination_taxiTrips)   
    
  app.route('/taxiTrips')
    .get(taxiTrip.list_all_taxiTrips)
  
  app.route('/taxiTrips/filter')
    .get(taxiTrip.filterByVendorID_taxiTrips)
  
  app.route('/taxiTrips/sort')
    .get(taxiTrip.sortByVendorID_taxiTrips)  
  
  app.route('/taxiTrips/:taxiTripId')
    .get(taxiTrip.read_a_taxiTrip)

  

  //default routes  

  app.route('/').get((req, res, next) => {
      res.send('server start on : "/" route')
  });  

  app.route('*').get((req, res, next) => {
    res.redirect('/');
  });

};