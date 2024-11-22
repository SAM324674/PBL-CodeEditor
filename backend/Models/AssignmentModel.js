const mongoose=require('mongoose');
const AssignmentSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    testcases:{
        type:Array,
        required:true
    },

    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teachers',
        required:true
    },
    deadline:{
        type:Date,
        required:true
    }
},{timestamps:true});

const Assignment=mongoose.model('assignment',AssignmentSchema);
module.exports=Assignment;