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
    const data = req.body 
   await noteModel.create({
        title:data.title,
        description:data.description
    })

    res.status(201).json({
        message:"note created successfully"
    })
})


module.exports = app // exporting the server instance

