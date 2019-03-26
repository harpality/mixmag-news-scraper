# MIXMAG News Scraper 💿

_MIXMAG News Scraper_ is a full-stack app which scrapes the latest news from mixmag.net. It utilizes Node.js, Cheerio, and Axios for data scraping then displays the front-end using the MVC pattern with Mongoose, Handlebars, and Express. Users may also add and delete comments on each article via a modal pop-up. The number of comments is shown on each article.

![Screenshot](public/assets/img/screenshot.png)

## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

Please clone and download this folder to your hard disk. You will then navigate to the folder and run `npm install` or `yarn`. This will install the `express`, `express-handlebars`, `cheerio`, `axios`, and `mongoose` dependencies.

Update the `PORT` settings in `express` if necessary, connect to your local `mongoDB` server and type `node server` in the console to get your personal server running. Open your favorite browser and visit `localhost:xxxx` in your browser where `xxxx` will be your port number.

## Functionality

This app uses the above modules to create a full news outlet which lets users leave and delete anonymous comments. Click 'Scrape New Articles' to get the latest news and feel free to leave a comment via the modal, if you wish. All data including the articles and comments are stored in a Mongo database.

🚀 Deployed at: https://mixmag-news-scraper.herokuapp.com/

## Built With

- Node.js
- Handlebars
- Cheerio
- Axios
- MongoDB
- Mongoose
- Express
