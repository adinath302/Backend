const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')

connectDB();

app.listen(3009,()=>{
    console.log('server is running on port 3000');
})