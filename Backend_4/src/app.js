const express = require("express");
const multer = require('multer');
const uploadFile = require('../src/services/storage.service.js')
const postModel = require("../src/models/post.model.js");
const cors = require("cors")

const app = express();
app.use(cors()) // to handle origin error which comes from using diffrent origin to interact  with 
app.use(express.json()) // Middlewear used to

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:10*1024*1024} // 10MB image size Limit
})

app.post('/create-post',upload.single('image'), async(req,res)=>{
try{

    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    if(!req.file){
        return res.status(400).json({message:"no image file provided"})
    }
    // We got a image file and we transfer it to the imagekit and they gave use a link in as a result 
    const result = await uploadFile(req.file.buffer)
    
    console.log("imageKit resutl:", result)
    
    // and we pass the result 
    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    })
     return res.status(201).json({
        message:"post created successfully",
        data:post
    })
}catch(error){
    console.log(error)
    return res.status(500).json({message:"something went wrong"})
}  
})

app.get("/posts",async(req,res)=>{
    try{
        const posts = await postModel.find()
        return res.status(200).json({
            message:"we got the posts",
            post:posts
        })
    }catch(error){
            return res.status(500).json({message:"something went wrong"})
        }
})


app.delete("/posts/:id",async(req,res)=>{
    try{
        const id = req.params.id
        const post = await postModel.findByIdAndDelete(id)

        // check if the post existed and was actually deleted
        if(!post){
            return res.status(404).json({
                message:"post not found"
            });
        }

        return res.status(200).json({
            message:"post deleted successfully",
            data:post
        })
    }catch(error){
         return res.status(500).json({
            message: "Something went wrong",
            error: error.message // Optional: helpful for debugging development environments
        });
    }
})

module.exports = app;