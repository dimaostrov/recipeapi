const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    label: String, 
    image: String,
    url: String,
    yield: Number,
    dietLabels: Array,
    healthLabels: Array,
    ingredients: Array 
});

const Recipe = mongoose.model('Recipe', schema);

module.exports = Recipe