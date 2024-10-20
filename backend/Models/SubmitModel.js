const mongoose=require('mongoose');

const submitSchema=new mongoose.Schema({
    questionId:{
        type:String,
        required:true
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students',
        required:true
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students',
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    evaluation:{
        type:String,
        required:true
    }
},{timestamps:true});
const Submit=mongoose.model('submissions',submitSchema)
module.exports=Submit;