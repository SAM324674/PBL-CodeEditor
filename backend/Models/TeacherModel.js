const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const saltRounds=12;

const teacherSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"TEACHER"
    }

},{timestamps:true});


// Hashing teachers password
teacherSchema.pre('save',async function(next){
    const teacher=this;
    if(!teacher.isModified('password')){
        return next();
    }

    try{
        const salt=await bcrypt.genSalt(saltRounds);
        const hash=await bcrypt.hash(teacher.password,salt);
        teacher.salt=salt;
        teacher.password=hash;
        next()
    }catch(err){
        console.err(err);
        next(err);
    }
})
const Teacher=mongoose.model('teacher',teacherSchema);

module.exports=Teacher;