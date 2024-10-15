const express=require('express');
const Student = require('../Models/StudentModel');
const bcrypt=require('bcrypt');
const { model } = require('mongoose');
const {createTokenForUser,validateToken}=require('../services/auth')
const router=express.Router();

router.post('/signup',async (req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    console.log("Recieved data",req.body);

    if(!firstName||!lastName||!email||!password){
        return res.status(400).send("Missing required fields");
    }
    try{
        const newStudent=await Student.create({
            firstName,
            lastName,
            email,
            password
        });
        console.log("new user created:",newStudent);    
        return res.redirect('/');
    }catch(err){
        console.error("error occured",err);
        return res.status(500).send("Error creating user");
    }
})

router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const isStudent=await Student.findOne({email});
        if(!isStudent){
            // console.log(isStudent);
            return res.status(400).send("User not found");
        }
        
        await bcrypt.compare(password,isStudent.password,(err,isMatch)=>{
            if(isMatch){
                console.log("logged in ");
                console.log(isStudent);
                // return res.json("successful");
                
                const token=createTokenForUser(isStudent);
                console.log(res.cookie('token',token));
                return res.cookie('token',token).redirect("/");
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