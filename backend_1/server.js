// used to start the server

const app = require('./src/app.js'); // here we are importing the server instance from the app.js file 

app.listen(3000, ()=>{
    console.log('server is running on port 3000');
})