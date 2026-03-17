const mongoose = require('mongoose')
async function database(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected successfully ")
    } catch (error) {
        console.log("database not connected error ",error)
    }
}
module.exports = database