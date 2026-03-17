const app = require('./app.js')
const database = require('./db/db.js')
const dotenv = require('dotenv')
dotenv.config();
const Port = process.env.PORT
app.listen(Port,()=>{
    console.log(`app is listning on port http://localhost:${Port}`)
})
database();