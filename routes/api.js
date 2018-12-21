var express = require("express");
var router = express.Router();
const { Recipe } = require('../models')

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/search", function(req, res, next) {
  let query = req.body.query;
  Recipe.find({ label: new RegExp(query, 'i')}).limit(30).exec(function(err, results){
    res.send(results);
  })
});

router.post("/search", function(req, res, next) {
  let query = req.body.query;
  Recipe.find({ label: new RegExp(query, 'i')}).limit(30).exec(function(err, results){
    res.send(results);
  })
});

module.exports = router;
