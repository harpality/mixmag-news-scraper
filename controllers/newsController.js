const express = require("express");
const router = express.Router();

// scraper modules
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
var db = require("../models");

// GET route for index and scraping MixMag website
router.get("/scrape", (req, res) => {
    // grab the html body via axios
    axios.get("https://mixmag.net/news").then(function(response) {
        // load the response into cheerio and save it to $
        const $ = cheerio.load(response.data);
        $("article").each(function(i, element) {
            let result = {};
            result.title = $(element).find("h3").text();
            result.summary = $(element).find("p").text();
            result.link = `https://mixmag.net${$(element).find("a").attr("href")}`;
            // console.log(result);

            //mongoose - create new Article using our scrape above
            db.Article.create(result)
            .then(function(dbArticle) {
                //view added result in console
                console.log(dbArticle);
            })
            .catch(function(err) {
                //log an error if occured
                console.log(err);
            })

        });
        res.redirect("/");
    });
  });

  router.get("/", function(req, res) {
      db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        })
  });
  


module.exports = router;