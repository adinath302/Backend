// used to create server

const express = require('express')

const app = express(); // this is the server instance not the server it self

app.use(express.json()) // this is the middleware that is used to parse the data that is sent to the server

const notes = [];

// created api with post method, in the req we get the data that we send to the server, in the res we send the response back to the client/user

app.post('/notes',(req,res)=>{ // this is the api to send the data to the server from the front-end
    notes.push(req.body)

    res.status(201).json({message:'note created successfully'}) // this is the response that is sent back to the client
})

app.get('/notes',(req,res)=>{ // this is the api to get the data from server to front-end
    res.status(200).json({ // this is the response that is sent back to the client
        message:'notes fetched successfully',
        notes:notes
    })    })

//delete api

app.delete('/notes/:index',(req,res)=>{

  const index =  req.params.index // 

  delete notes[index]

  res.status(200).json({
    message:'note deleted successfully' 
 })
})

// this is the route handler to update the note
app.patch("/notes/:index",(req,res)=>{  // using patch we update the existing note/data

    const index = req.params.index
    const description = req.body.description


    notes[index].description = description

    res.status(200).json({
        message:'note updated successfully',
    })
})

module.exports = app;

// TlGiTp12C8knmDpD 
// mongodb+srv://yt:TlGiTp12C8knmDpD@cluster0.hsy8epu.mongodb.net/