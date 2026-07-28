const mongoose = require("mongoose");

async function connectDB (){
    await mongoose.connect("mongodb+srv://yt:TlGiTp12C8knmDpD@cluster0.hsy8epu.mongodb.net/halley")
} 

console.log("connected to DB")

module.exports = connectDB