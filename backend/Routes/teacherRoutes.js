const express=require('express');
const Teacher = require('../Models/TeacherModel');
const bcrypt=require('bcrypt');
const { model } = require('mongoose');
const router=express.Router();

router.post('/signup',async (req,res)=>{
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
        return res.redirect('/');
    }catch(err){
        console.error("error occured",err);
        return res.status(500).send("Error creating user");
    }
})

router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const isTeacher=await Teacher.findOne({email});
        if(!isTeacher){
            return res.status(400).send("User not found");
        }
        
        await bcrypt.compare(password,isTeacher.password,(err,isMatch)=>{
            if(isMatch){
                console.log("logged in ");
                return res.json("successful");
            }
            else{
                return res.status(400).send("Incorrect password");
            }
        })
    } catch(err){
        console.error("Error occured",err);
        return res.status(500).send("Login failed");
    }
})
// router.get('/student/signup',(req,res)=>{

// })

// router.post('/student/signin',async (req,res)=>{
    
// })

module.exports=router;