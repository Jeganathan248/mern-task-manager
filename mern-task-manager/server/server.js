
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const Task = mongoose.model("Task",{
  title:String,
  completed:Boolean
});

app.get("/",(req,res)=>{
  res.send("Task Manager Backend Running");
});

app.get("/tasks", async(req,res)=>{
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async(req,res)=>{
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.listen(5000,()=>console.log("Server running on port 5000"));
