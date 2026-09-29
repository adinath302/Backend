const express = require('express');
const multer = require('multer')
const cors = require('cors');
const postModel = require('./models/post.model');
const app = express()

// Globle Middlewares
app.use(express.json()) 
app.use(cors())

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:10*1024*1024}
})

app.post('/createPost',upload.single('image') ,async (req, res) => {
    try{
        const post = await postModel.create({
            caption:req.body,
            image: req.file,
        })
    return res.status(201).json({
        message:"message sent to the server",
        data:post
    })
    }catch(error){
    return res.status(500).json({message:"something went wrong"})
    }
});

module.exports = app