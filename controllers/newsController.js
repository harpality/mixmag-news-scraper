const express = require("express");
const router = express.Router();

// scraper modules
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
var db = require("../models");

// GET route for index and scraping MixMag website
router.get("/", (req, res) => {
    // grab the html body via axios
    axios.get("https://mixmag.net/news").then((response) => {
        // load the response into cheerio and save it to $
        const $ = cheerio.load(response.data);
        $("article").each((i, element) => {
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
        
        res.send("scrape complete")
    });



    // res.render("index")
  });
  


module.exports = router;