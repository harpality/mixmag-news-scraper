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
      db.Article.find().sort({time: -1}) 
        .then(function(dbArticle) {
            res.render("index", {result:dbArticle});
        })
        .catch(function(err) {
            res.json(err);
        })
  });
  
  router.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
          res.json(dbArticle);
      })
      .catch(function(err) {
          res.json(err);
      })
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("comment")
      .then(function(dbArticle) {
        console.log(dbArticle)
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

router.post("/articles/:id", function(req,res) {
    db.Comment.create(req.body)
    .then(function(dbComment) {
        return db.Article.findOneAndUpdate({_id:req.params.id}, {comment: dbComment._id}, {new:true});
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    })
});




module.exports = router;