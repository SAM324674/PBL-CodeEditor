const express=require('express');
const Student = require('../Models/StudentModel');
const bcrypt=require('bcrypt');
const { model } = require('mongoose');
const {createTokenForUser,validateToken}=require('../services/auth');

const router=express.Router();

router.post('/signup',async (req,res)=>{
    const {firstName,lastName,email,password,teacherId}=req.body;
    
    if(!firstName||!lastName||!email||!password||!teacherId){
        return res.status(400).json("Required All fields");
    }
    try{
        const newStudent=await Student.create({
            firstName,
            lastName,
            email,
            password,
            teacherId
        });
        console.log("new user created:",newStudent);   
        const token=createTokenForUser(newStudent); 
        console.log('token created');
        // res.send(token);
        return res.json({
            message:"User Successfully Created",
            token
        });
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
            return res.status(400).json("User not found");
        }
        
        await bcrypt.compare(password,isStudent.password,(err,isMatch)=>{
            if(isMatch){
                const token=createTokenForUser(isStudent);
                // res.send(token);
                return res.json({
                    message : "successfully logged in",
                    token
                 });
            }
            else{
                return res.status(400).json("Internal Server Occured",err);
            }
        })

    } catch(err){
        console.error("Error occured",err);
        return res.status(500).send("Login failed");
    }
})

module.exports=router;