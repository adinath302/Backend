const express = require('express');
const cors = require('cors')
const app = express()

// Globle Middlewares
app.use(express.json()) 
app.use(cors())

app.get('/', (req, res) => {
    res.send('Backend server is working successfully!');
});




module.exports = app