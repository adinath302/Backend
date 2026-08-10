const express = require('express')
const noteModel = require("./models/note.model.js")
const app = express() // it's an instance of server

module.exports = app; // export the server instance

app.use(express.json()); // this is middleware that is used to parse the data that is sent to the server

app.post('/notes',async(req,res)=>{

    const body = req.body

    await noteModel.create({
        title:body.title,
        description:body.description
    })

res.status(200).json({message:'note created successfully',
    data:await noteModel.find()
})
})

app.get('/notes',async(req,res)=>{
    res.status(200).json({
        message:"notes fetched successfully",
        data: await noteModel.find()
    })
})

app.delete('/notes/:index',async(req,res)=>{
    const index = req.params.index // this is the index that is sent to the server
    
    await noteModel.findByIdAndDelete(index)
    
    res.status(200).json({
        message:"note deleted successfully",
        data:await noteModel.find()
    })
})

app.patch('/notes/:index',async(req,res)=>{
    const  id = req.params.index
    const description = req.body.description
    const title = req.body.title

    await noteModel.findByIdAndUpdate({_id:id},{description:description,title:title})
    res.status(200).json({
        message:"note updated successfully",
        data:await noteModel.find()
    })
})