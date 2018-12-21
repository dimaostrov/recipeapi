const { db, Seed, Recipe } = require("../models");
require("dotenv").config();
const axios = require("axios");
const throttledQueue = require("throttled-queue");

const throttle = throttledQueue(1, 19000);
// const throttle = throttledQueue(1, 1000)

const findNotUpdated = async () => {
  let searchTerms = [];
  // push items to urls to query with throttling
  await Seed.find({}, (err, docs) => {
    if (err) console.error(err);
    for (i of docs) {
      if (!i.queried) {
        searchTerms.push(i.name);
      }
    }
  });

  // here loop through urls and add each result to DB

  for (let i of searchTerms) {
    throttle(function() {
      callApi(generateCall(i), i);
    });
  }
};

function queryEdamam(name) {}

function generateCall(search) {
  return `https://api.edamam.com/search?q=${search}&app_id=${
    process.env.EDAMAM_ID
  }&app_key=${process.env.EDAMAM_KEY}&from=0&to=30`;
}

let url = generateCall("apple");
const callApi = (url, name) => {
  axios({
    method: "get",
    url: url,
    responseType: "json"
  })
    .then(function(res) {
      let recipes = res.data.hits;
      for (let recipe of recipes) {
        let i = recipe["recipe"];
        let id = i.uri.split("recipe_")[1];
        let entry = new Recipe({
          id: id,
          uri: i.uri,
          label: i.label,
          image: i.image,
          url: i.url,
          yield: i.yield,
          dietLabels: i.dietLabels,
          healthLabels: i.healthLabels,
          ingredients: i.ingredients
        });
        entry.save(function(err, doc) {
          if (err) return console.error(err.errmsg, ` ${i.label} didnt save`);
          console.log(doc.label, "obj saved!");
        });
      }
      console.log(name);
      let query = { name: name };
      Seed.findOneAndUpdate(query, { $set: { queried: true } });
    })
    .catch(function(err) {
      console.log(err);
    });
};

findNotUpdated();
// db.close();

// findNotUpdated()
/*
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
*/
//parseJson()
//console.log(url)
