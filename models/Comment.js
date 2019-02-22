const mongoose = require("mongoose");

// save reference to schema constructor
const Schema = mongoose.Schema; 

const CommentSchema = new Schema ({
    title: String,
    body: String
});

// create the model using mongoose method
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
