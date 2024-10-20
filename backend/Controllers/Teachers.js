const Teacher = require('../Models/TeacherModel');
const bcrypt=require('bcrypt');
const { model } = require('mongoose');
const { createTokenForUser, validateToken } = require('../services/auth');
const { response } = require('express');
const Student = require('../Models/StudentModel');
const Submit = require('../Models/SubmitModel');


const SignUp=async (req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    console.log("Recieved data",req.body);

    if(!firstName||!lastName||!email||!password){
        return res.status(400).send("Missing required fields");
    }
    try{
        const newTeacher=await Teacher.create({
            firstName,
            lastName,
            email,
            password
        });
        console.log("new user created:",newTeacher);    
        const token=createTokenForUser(newTeacher);
        return res.json({
            message:"teacher successfully created",
            token:token
        });
    }catch(err){
        console.error("error occured",err);
        return res.status(500).send("Error creating user");
    }
}


const SignIn=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const isTeacher=await Teacher.findOne({email});
        if(!isTeacher){
            return res.status(400).send("User not found");
        }
        
        await bcrypt.compare(password,isTeacher.password,(err,isMatch)=>{
            if(isMatch){
                const token=createTokenForUser(isTeacher);
                console.log("logged in ");
                return res.json({
                    message:"successfully logged in",
                    token:token
                });
            }
            else{
                return res.status(400).send("Incorrect password");
            }
        })
    } catch(err){
        console.error("Error occured",err);
        return res.status(500).send("Login failed");
    }
}


const fetchSubmissions=async(req,res)=>{
    const AuthHeader=req.headers.authorization;
    console.log("headers recieved",AuthHeader);
    if(!AuthHeader){
        return res.status(400).json("Authorisation header missing");
    }
    const token=AuthHeader.split(' ')[1];
    if(!token){
        return res.status(400).json("Token missing");
    }
    const decode=validateToken(token);
    console.log(decode);
    const teacherId=decode._id;
    //TO FETCH STUDENTS ASSIGNED UNDER THE TEACHER
    try {
        const submissions=await Submit.find({teacherId});
        console.log(submissions);
        res.status(200).json({message:"submissions of students assigned under teacher",submissions});
    } catch (error) {
         console.error('error occured:',error);
         res.status(500).json({error:"error occured during fetching submissions"});
    }
    // return res.json({
    //     submissions:submissions
    // })
}
module.exports={SignUp,SignIn,fetchSubmissions}