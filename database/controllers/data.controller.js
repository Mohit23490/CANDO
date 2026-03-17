const Task = require('../models/task.model.js')

async function retrivedata(req,res){
try {
        const data =  req.body;
        for (const key in data) {
         for (const element of data[key]) {
          const alreadyexisted = await Task.findOne({
              "task.title":element.title,
               "task.desc":element.desc
          })

          if(alreadyexisted){
            if(alreadyexisted.task.status === key){
                  console.log("already exist skip")
            }
            else{
               alreadyexisted.task.status = key;
               await alreadyexisted.save();
            }
         }else{
            await Task.create({
               task:{
                 title: element.title,
                 desc: element.desc,
                 status:key
            }
          })
         }
        }
     }
     res.status(200).json({
        message:"task created successfully"
     })
    
} catch (error) {
         res.send(error)
      }
}
async function sendData(req,res){
     try {
      const todo = [];
     const recent = [];
     const done =[];
     const allitems = await Task.find();
     console.log(allitems)
     for (const key of allitems) {
        if(key.task.status === "todo"){
          todo.push({
              id: key._id,  
              title: key.task.title,
              desc: key.task.desc
            })
        }
        else if(key.task.status === "recent"){
          recent.push({
              id: key._id,  
              title: key.task.title,
              desc: key.task.desc
          })
        }
        else {
          done.push({
              id: key._id,  
              title: key.task.title,
              desc: key.task.desc
          })
        }
     }
     res.status(200).json({
     todo: todo,
     recent: recent,
     done: done
     })
     } catch (error) {
      console.log(error)
     }
}
async function DeleteTask(req, res) {
    try {
        await Task.findByIdAndDelete(req.params.id) 
        res.status(200).json({
            message: "data deleted successfully"
        })
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {retrivedata,sendData,DeleteTask}
