const fs = require("fs");
var path = require("path");
const readline = require("readline");
const { db, Seed, Recipe } = require("../models");
require("dotenv").config();
const axios = require("axios");
const {parse, stringify} = require('flatted/cjs');

const findNotUpdated = () => {
  Seed.find({}, (err, docs) => {
    for (i of docs) {
      if (!i.queried) {
        queryEdamam(i.name);
      }
    }
  });
};

function queryEdamam(name) {}

function generateCall(search, appId, appKey) {
  return `https://api.edamam.com/search?q=${search}&app_id=${appId}&app_key=${appKey}&from=0&to=30`;
}

let url = generateCall("apple", process.env.EDAMAM_ID, process.env.EDAMAM_KEY);
const callApi = (url) => {
    axios
      .get(url)
      .then(function(res) {
        let recipes = res.data.hits
        writeToFile('recipes.json', recipes)
        //fs.writeFileSync("edamam.json", JSON.stringify(res));
    })
    .catch(function(err) {
        console.log(err);
    });
}

// findNotUpdated()

const writeToFile = (name, data) => {
    fs.writeFile(name, data, err => {
        // throws an error, you could also catch it here
        if (err) throw err;
        
        // success case, the file was saved
        console.log("file saved!");
    });
};

const parseJson = () => {
    let file = fs.readFileSync('recipetrial.json', 'utf8')
    let parsed = JSON.parse(file)
    console.log(parsed[0])
}

//parseJson()
//console.log(url)

db.close()