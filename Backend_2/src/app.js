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
   await noteModel.create({ // this is the method that is used to create a note
        title:data.title,
        description:data.description
    })

    res.status(201).json({ // this is the response that is sent back to the client
        message:"note created successfully",
       notes:notes
    })
})

app.get('/notes',async(req,res)=>{

//  const notes = await noteModel.find() // this is the method that is used to get all the notes from the database and it allways return an array 

 const notes = await noteModel.find() // this is the method that is used to get all the notes from the database and it allways return an array 

//  const notes = await noteModel.findOne({ // it will find the note with the title "test_title_3"
    // title:"test_title_3"
//  }) // this is the method that is used to get all the notes from the database and it allways return an array 

/* 

find = >[{},{}] & []
findone => {} , null

*/

 res.status(200).json({
    message:"notes fetched successfully",
    notes:notes
 })
}) 

app.delete('/notes/:id',async(req, res)=>{
    const id = req.params.id // this is the index that is sent to the server
    // delete the specific note from the MongoDB
    await noteModel.findOneAndDelete({
        _id:id
})

    const remainingNotes = await noteModel.find() // this is the database query to get the remaining notes

    res.status(200).json({
        message:"note deleted successfully",
        remainingNotes:remainingNotes
    })
})

app.patch('/notes/:id',async(req,res)=>{
    const id = req.params.id 

    const description = req.body.description

// in findOneAndUpdate --> in first object to define which bases to update and in second object to define what to update
    await noteModel.findOneAndUpdate({_id:id},{description:description})
    
    res.status(200).json({
        message:"note updated successfully",
        remainingNotes: await noteModel.find() 
    })

})



module.exports = app // exporting the server instance

