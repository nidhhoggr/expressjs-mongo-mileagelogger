var
  mongoose = require('mongoose'), 
  Trip = mongoose.model('Trip'),
  TripLocation = mongoose.model('TripLocation'),
  utils = require('connect').utils,
  route_name = "trip/";

exports.index = function(req, res){
  Trip.
    find({ user_id : req.cookies.user_id }). 
    sort( '-updated_at' ).
    exec( function ( err, trips ) {  
      if( err ) return next( err );
      res.render( route_name + 'index', { 
        title: 'My Trips',
        trips: trips
      });
    });
};

exports.add = function(req, res) {

  TripLocation.
    find({ user_id : req.cookies.user_id }).
    sort( '-updated_at' ).
    exec( function ( err, trip_locations ) {

      if( err ) return next( err );

      res.render( route_name + 'add', {
        title: 'Add Trip',
        trip_locations: trip_locations
      });

    });
}

exports.create = function( req, res ) {

    new Trip({ 
        user_id: req.cookies.user_id,
        name: req.body.name, 
        mileage: req.body.mileage,
        trip_locations: req.body.trip_locations,
        summary: req.body.summary,
        updated_at: Date.now()
    }).save( function( err, trip, count) {

        if( err ) return next( err );
        res.redirect( route_name );
    });
};

exports.destroy = function( req, res, next ) {

  Trip.findById( req.params.id, function ( err, trip ){
    if( trip.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }
 
    trip.remove( function ( err, trip ){

      if( err ) return next( err );
      res.redirect( route_name );
    });
  });

};

exports.edit = function( req, res){

  TripLocation.
    find({ user_id : req.cookies.user_id }).
    sort( '-updated_at' ).
    exec( function ( err, trip_locations ) {

      Trip.
        find({ user_id : req.cookies.user_id }).
        sort( '-updated_at' ).
        exec( function ( err, trips) {
          res.render( route_name + 'edit', {
          title: 'Edit Trip',
          trips: trips,
          trip_locations: trip_locations,
          current: req.params.id
        });
      });
  });

};

exports.update = function( req, res) {

  Trip.findById( req.params.id, function ( err, trip) {

    if( trip.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    trip.name = req.body.name;
    trip.mileage = req.body.mileage;
    trip.trip_locations = req.body.trip_locations;
    trip.summary = req.body.summary;
    trip.updated_at = Date.now(); 
    trip.save( function( err, trip, count ) {
        res.redirect( route_name );
    });
  });
};
