const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){
    const {username,email,password} = req.body;

    // it finds if there is any user with this email or return null
    const isUserAlreadyExists = await userModel.findOne({
email
    })

    // if user is allready exists they show the response
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists"
        })
    }

    // here we created login data to database 
    const user = await userModel.create({
        username,email,password
    })

    // here created the token by using jwt package
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    // set token using cookie
    res.cookie('token',token)

    // passed back as a res
    res.status(201).json({
        message:'User registerd successfully',
        user,
    })
}

module.exports = {registerUser}