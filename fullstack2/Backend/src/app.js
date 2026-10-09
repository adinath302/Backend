const express = require('express');
const multer = require('multer')
const cors = require('cors');
const postModel = require('./models/post.model');
const uploadFile = require('./services/storage.service');
const app = express()

// Globle Middlewares
app.use(cors())
app.use(express.json()) 

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:10*1024*1024}
})

app.post('/createPost',upload.single('image') ,async (req, res) => {
    try{

        if(!req.file){
            return res.status(400).json({message:"no image file provided"})
        }

        const result = await uploadFile(req.file.buffer)

        const post = await postModel.create({
            image: result.url,
            caption:req.body.caption,
        })

        return res.status(201).json({
        message:"message sent to the server",
        data:post
    })
    }catch(error){
    return res.status(500).json({message:"something went wrong"})
    }
});
    
app.get('/createPost',async (req,res)=>{
    try{
        const posts = await postModel.find()
        return res.status(200).json({
            message:'we got the data',
            post:posts
        })
    }catch(error){
    return res.status(500).json({message:'something went wrong while getting the data '})
    }
})

module.exports = app