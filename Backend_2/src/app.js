const express = require('express')
const noteModel = require('./models/note.model.js')
const app = express() // this is the server instance not the server it self 

app.use(express.json()) // this is the middleware that is used to parse the data that is sent to the server

/*
post /notes - create a note
get /notes - get all notes
delete /notes/:index - delete a note
patch /notes/:index - update a note
*/

app.post('/notes',async(req,res)=>{
    const data = req.body  // this is the data that is sent to the server
   await noteModel.create({ // this is the method that is used to create a note in the database
        title:data.title,
        description:data.description
    })

    res.status(201).json({ // this is the response that is sent back to the client
        message:"note created successfully"
    })
})

app.get('/notes',async(req,res)=>{
 const notes = await noteModel.find() // this is the method that is used to get all the notes from the database and it allways return an array 

 res.status(200).json({
    message:"notes fetched successfully",
    notes:notes
 })
}) 

module.exports = app // exporting the server instance

