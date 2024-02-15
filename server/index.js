const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute')

const app = express();
require("dotenv").config()

app.use(express.json())
app.use(cors());
app.use("/api/users",userRoutes);
app.use('/api/chats',chatRoute);
app.use('/api/messages',messageRoute);

app.get('/',(req,res)=>{
    res.send("hello Chat app");
})

const port = process.env.PORT || 8000;
const url = process.env.ATLAS_URL || '';  

app.listen(port,(req,res)=>{
   (`Server running on port: ${port}`);
});

mongoose.connect(url)
.then(()=>console.log("Connected to MongoDb "))
.catch((error)=>console.log("MongoDb Connection Failed:",error.message));