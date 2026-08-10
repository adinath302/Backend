const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect("mongodb+srv://adiDatabase2:c5tJrQr%25uzv2WDV@backend2.edels1j.mongodb.net/?retryWrites=true&w=majority")
}

console.log("connect to DB")

module.exports = connectDB

// mongodb+srv://adiDatabase2:c5tJrQr%uzv2WDV@backend2.edels1j.mongodb.net/?retryWrites=true&w=majority

