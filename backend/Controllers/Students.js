const Student = require('../Models/StudentModel');
const bcrypt=require('bcrypt');
const { model } = require('mongoose');
const {createTokenForUser,validateToken}=require('../services/auth');
const Assignment=require('../Models/AssignmentModel')
const {format}=require('date-fns')
const SignUp=async (req,res)=>{
    const {firstName,lastName,email,password,teacherId}=req.body;
    
    if(!firstName||!email||!password||!teacherId){
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
}

const SignIn=async(req,res)=>{
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
}

const getNewAssignment=async(req,res)=>{
    let AssignmentCount=0;
    const AuthHeader=req.headers.authorisation;
    console.log("authorisation header:",AuthHeader);
    if(!AuthHeader){
        return res.status(401).json({message:"Authorization header missing"});
    }
    const token=AuthHeader.split(' ')[1];
    console.log("token",token);
    if(!token){
        return res.status(401).json({
            message:"Token missing"
        });
    }
    const decode=validateToken(token);
    console.log("decode:",decode);
    const studentId=decode._id;
    console.log("student id:",studentId);
    
    const student=await Student.findById(studentId);
    if(!student){
        return res.json("student not found");
    }
    console.log("student",student);
    const teacherOfStudent=student.teacherId;
    console.log("assigned teacher",teacherOfStudent);
    AssignmentCount=await Assignment.collection.countDocuments();
    console.log("No. of Assignments:",AssignmentCount);
    const Assignments=await Assignment.find({teacherId:teacherOfStudent});
    if (!Assignments.length) {
        return res.status(404).json({ message: "No assignments found for this teacher" });
    }
    
    let today = new Date();
    // let dd = String(today
    console.log("today:",today);
    const formattedAssignments=Assignments.map((doc)=>({
        assignmentId:doc._id,
        question: doc.question,
        testcases: doc.testcases,
        testcasecount:doc.testcases?doc.testcases.length:0,
        deadline: doc.deadline ? format(new Date(doc.deadline), "yyyy-MM-dd") : "No deadline",
        expired: new Date(doc.deadline)<today?true:false
    }));
       
    
    
    console.log("all of the assignments:",formattedAssignments);
    return res.status(200).json({
         assignments:formattedAssignments,     
         count:AssignmentCount,

       })

}

module.exports={SignUp,SignIn,getNewAssignment};