const express = require("express");
const router = express.Router();

// scraper modules
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
// var db = require("../models");

router.get("/", (req, res) => {
    res.render("index")
  });
  


module.exports = router;