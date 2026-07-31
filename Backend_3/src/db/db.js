const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect("mongodb+srv://adinathgaware23072003_db_user:81Yo1nhmBTJUy4DV@backend2.edels1j.mongodb.net/?appName=Backend2")
}

console.log("connect to DB")

module.exports = connectDB