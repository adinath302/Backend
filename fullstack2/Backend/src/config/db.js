const mongoose = require('mongoose')

const connectDB = async()=>{
 try{
    await mongoose.connect(process.env.mongoose_URL)
    console.log("Mongodb connected successfully ");
 }catch(error){
console.log('MongoDB connection failed ', error.message)
 }   

}

module.exports = connectDB;