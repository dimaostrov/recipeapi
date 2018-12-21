//Import the mongoose module
var mongoose = require('mongoose');
const Recipe = require('./recipe')
const Seed = require('./seed')


//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/recipes';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




module.exports = {
    db,
    Recipe,
    Seed
}