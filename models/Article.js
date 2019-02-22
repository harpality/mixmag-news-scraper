const mongoose = require("mongoose");

// save reference to the schema constructor 
const Schema = mongoose.Schema;

// create schema for each article 
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary:  {
        type: String,
        required: true
        
    },
    link: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

//this will create our model from the schema above with mongoose
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;