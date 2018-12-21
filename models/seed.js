const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name: {type: String, unique: true},
    queried: {type: Boolean, default: false} 
});

const Seed = mongoose.model('Seed', schema);

module.exports = Seed