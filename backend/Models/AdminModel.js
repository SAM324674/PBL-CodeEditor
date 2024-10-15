const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const saltRounds=12;

const adminSchema =new mongoose.Schema({
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
        default:"ADMIN"
    }

},{timestamps:true});

// hashing password of admin
adminSchema.pre('save',)
const Admin=mongoose.model('admin',adminSchema);

module.exports=Admin;