import express from 'express';
const router = express.Router();
import {Task} from '../models/taskModel.js';

//route to save new tasks
router.post('/',async (request,response)=>{
try {
    if(!request.body.title || !request.body.comments ||!request.body.status  ){
        return response.status(400).send({
            message: 'Send all required fields : title , comments , status'
        });
    }
    const newTask = {
        title : request.body.title,
        comments : request.body.comments ,
        status :request.body.status ,

    }; 
    const todo =await Task.create(newTask);
    return response.status(201).send(todo);
    
} catch (error) { 
    console.log(error.message);
    response.status(500).send({message : error.message});
}
});

// Route for getting one task by id
router.get('/',async (request,response)=>{
    try {

        const todos = await Task.find({});

        return response.status(200).json({
            count : todos.length,
            data : todos
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }

});

// Route for getting one task by id
router.get('/:id',async (request,response)=>{
    try {
        const {id} = request.params;
        const todo = await Task.findById(id);

        return response.status(200).json(todo);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }

});

// Route to update a task
router.put('/:id',async (request,response)=>{
    try {
         if(!request.body.title || !request.body.comments ||!request.body.status  ){
        return response.status(400).send({
            message: 'Send all required fields : title , comments , status'
        });
    }

    const { id } = request.params;
    const result = await Task.findByIdAndUpdate(id,request.body);
    if(!result){
        return response.status(404).json({message : "task not found"});
    }
    return response.status(200).json({message : "task updated successfully"});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }

});


// Route to delete a task
router.delete('/:id',async (request,response)=>{
    try {

    const { id } = request.params;
    const result = await Task.findByIdAndDelete(id);
    if(!result){
        return response.status(404).json({message : "task not found"});
    }
    return response.status(200).json({message : "task deleted successfully"});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }

});


export default router;