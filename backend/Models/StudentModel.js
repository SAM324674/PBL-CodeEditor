const {mongoose,Schema,model}=require('mongoose');
const bcrypt=require('bcrypt');
const saltrounds=12;
const studentSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        
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
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teachers',
        default:null
        
    },
    salt:{
        type:String,
    }

},{timestamps:true});

//Hashing password before saving students
studentSchema.pre('save',async function(next){
    const student=this;
    if(!student.isModified('password')){
        return next();
    }
    try{
        const salt=await bcrypt.genSalt(saltrounds);
        const hash=await bcrypt.hash(student.password,salt);
        student.salt=salt;
        student.password=hash;
        next(); 
    }
    catch(err){
        console.error(err);
        next(err)
    }

})

const Student=mongoose.model('student',studentSchema);

module.exports=Student;