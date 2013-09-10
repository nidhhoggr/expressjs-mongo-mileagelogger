
/*
 * GET home page.
 */

var
  mongoose = require('mongoose'),
  Trip = mongoose.model('Trip');

exports.index = function ( req, res ){
  Trip.
    find({ user_id : req.cookies.user_id }).
    sort( '-updated_at' ).
    exec( function ( err, trips, count ){
      if(err) return next(err);
      res.render( 'index', {
          title : 'Latest Trips',
          trips : trips
      });
    });
}; 

/**
 *
 * User cookie middle ware to be invoked within app configuration
 */

exports.user_cookie = function(req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.user_id;
    if (cookie === undefined)
    {
      // no: set a new cookie
      var randomNumber=Math.random().toString();
      randomNumber=randomNumber.substring(2,randomNumber.length);
      res.cookie('user_id',randomNumber, { maxAge: 900000, httpOnly: true });
      //console.log('cookie have created successfully');
    }
    else
    {
      // yes, cookie was already present 
      //console.log('cookie exists', cookie);
    }
    next(); // <-- important!
};
