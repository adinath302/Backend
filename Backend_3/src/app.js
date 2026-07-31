const express = require('express')
const noteModel = require("./models/note.model.js")
const app = express() // it's an instance of server

module.exports = app; // export the server instance

app.use(express.json()); // this is middleware that is used to parse the data that is sent to the server


app.post('/notes',async(req,res)=>{

    const data = req.body
    await noteModel.create({
        
    })
notes.push(req.body) // this is the data that is sent to the server


res.status(201).json({message:'note created successfully'})
})

app.get('/notes',async(req,res)=>{
    res.status(200).json({
        message:"notes fetched successfully",
        notes:notes
    })
})

app.delete('/notes/:index',async(req,res)=>{
    const index = req.params.index // this is the index that is sent to the server
    
    delete notes[index] // this is the data that is sent to the server

    res.status(200).json({
        message:"note deleted successfully",
        notes:notes
    })
})