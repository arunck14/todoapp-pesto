import express, { request, response } from "express";
import { PORT ,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Task} from  './models/taskModel.js';
import tasksRoute from './routes/tasksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

//middleware to use cors policy
app.use(cors());

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("welcome to my app");
});

app.use('/tasks',tasksRoute);


mongoose.connect(mongoDBURL)
.then(()=>{
 console.log('App connected to database');
 app.listen(PORT,()=>{
   console.log( `App is listening to port  : ${PORT}`);
});
})
.catch((error)=>{
console.log(error);
});