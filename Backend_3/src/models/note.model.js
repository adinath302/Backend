const mongoose = require('mongoose');

// schema for note
const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
})

const noteModel = mongoose.model("note", noteSchema); // model for note 

module.exports = noteModel;