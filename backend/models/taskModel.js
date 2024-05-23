import mongoose from "mongoose";
const taskSchema = mongoose.Schema(
    {
        title:{
        type : String,
        required : true,
        },
        comments:{
        type : String,
        required : true,
    },
    status:{
        type : String,
        required : true,
    }

    },{
        timestamps :true,
    }
);
export const Task = mongoose.model('TaskToDo', taskSchema);