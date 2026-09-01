const express = require("express");
const multer = require('multer');
const uploadFile = require('../src/services/storage.service.js')
const postModel = require("../src/models/post.model.js");

const app = express();

app.use(express.json()) // Middlewear used to

const upload = multer({storage:multer.memoryStorage()})

app.post('/create-post',upload.single('image'), async(req,res)=>{
try{

    // We got a image file and we transfer it to the imagekit and they gave use a link in as a result 
    const result = await uploadFile(req.file.buffer)
    console.log(result)
    
    // and we pass the result 
    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    })
}catch(error){
    console.log(error)
    return res.status(500).json({message:"something went wrong"})
}

    return res.status(201).json({
        message:"post created successfully",
        data:post
    })

})

module.exports = app;