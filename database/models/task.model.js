const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
   task:{
    title:String,
    desc:String,
    status:{
        type:String,
        enum:["todo","recent","done"],
        default:"todo"
    }
   }
},{timestamps:true})
const Task = mongoose.model("Task",TaskSchema)
module.exports = Task;