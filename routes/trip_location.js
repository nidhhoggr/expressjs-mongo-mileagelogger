var
  mongoose = require('mongoose'), 
  TripLocation = mongoose.model('TripLocation'),
  utils = require('connect').utils,
  route_name = "trip_location/";

exports.index = function(req, res){
  TripLocation.
    find({ user_id : req.cookies.user_id }). 
    sort( '-updated_at' ).
    exec( function ( err, trip_locations ) {  
      if( err ) return next( err );
      res.render( route_name + 'index', { 
        title: 'My Trip Locations',
        trip_locations: trip_locations
      });
    });
};

exports.add = function(req, res) {

    res.render( route_name + 'add', {
        title: 'Add Trip Location',
    });
}

exports.create = function( req, res ) {

    new TripLocation({ 
        user_id: req.cookies.user_id,
        name: req.body.name, 
        address: req.body.address,
        updated_at: Date.now()
    }).save( function( err, trip_location, count) {

        if( err ) return next( err );
        res.redirect( route_name );
    });
};

exports.destroy = function( req, res, next ) {

  TripLocation.findById( req.params.id, function ( err, trip_location ){
    if( trip_location.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }
 
    trip_location.remove( function ( err, trip_location ){

      if( err ) return next( err );
      res.redirect( route_name );
    });
  });

};

exports.edit = function( req, res){
  TripLocation.
    find({ user_id : req.cookies.user_id }).
    sort( '-updated_at' ).
    exec( function ( err, trip_locations) {
      res.render( route_name + 'edit', {
        title: 'Edit Trip Location',
        trip_locations: trip_locations,
        current: req.params.id
    });
  });
};

exports.update = function( req, res) {

  TripLocation.findById( req.params.id, function ( err, trip_location) {

    if( trip_location.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }

    trip_location.name = req.body.name;
    trip_location.address = req.body.address;
    trip_location.updated_at = Date.now(); 
    trip_location.save( function( err, trip_location, count ) {
        res.redirect( route_name );
    });
  });
};
