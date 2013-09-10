var 
    mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Trip = new Schema({
    user_id: String,
    name: String,
    mileage : String,
    trip_locations: Array,
    summary: String

});

var TripLocation = new Schema({
    user_id: String,
    name: String,
    address: String
});

mongoose.model('Trip', Trip);
mongoose.model('TripLocation', TripLocation);

mongoose.connect( 'mongodb://localhost/express-mileage' );
