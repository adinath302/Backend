const app = require('./src/app.js')
const connnectDb = require('./models/note.model.js')

connectDB();

app.listen(3009,()=>{
    console.log('server is running on port 3000');
})