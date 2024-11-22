const Teacher = require('../Models/TeacherModel');
const bcrypt=require('bcrypt');
const { model } = require('mongoose');
const { createTokenForUser, validateToken } = require('../services/auth');
const { response } = require('express');
const Student = require('../Models/StudentModel');
const Submit = require('../Models/SubmitModel');
const Assignment = require('../Models/AssignmentModel');
const {format}=require('date-fns');

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

const addAssignment=async(req,res)=>{
    const {question,testcases,deadline}=req.body;
    console.log("recieved from frontend",req.body);
    const authHeader=req.headers.authorization;
    console.log("auth header recieved:",authHeader);
    if(!authHeader){
        return res.status(401).json({message:"Authorization header missing"});
    }
    const token=authHeader.split(' ')[1];
    console.log("token",token);
    if(!token){
        return res.status(401).json({
            message:"Token missing"
        });
    }
    const decode=validateToken(token);
    console.log("decode:",decode);
    const teacherId=decode._id;
    console.log("teachers id:",teacherId);
    
    const teacher=await Teacher.findById(teacherId);
    if(!question||!testcases){
        return res.status(400).send("Missing required fields");
    }
   
    try{
        const newAssignment=await Assignment.create({
            question,
            testcases,
            teacherId,
            deadline
        });
        console.log("new assignment added to database:",newAssignment);
        return res.status(200).json({
            message:"new assignment added successfully!!",
            newAssignment
        })
    }catch(error){
        console.error("error:",error);
        res.status(500).json({
            error:error
        })
    }
}

const getNewAssignment=async(req,res)=>{
    let AssignmentCount=0;
        
    AssignmentCount=await Assignment.collection.countDocuments();
    console.log("No. of Assignments:",AssignmentCount);
    
    const Assignments=await Assignment.find({});
    // const AssignmentArray=Assignments.map(doc=>Object.values(doc._doc))
    // const AssignmentQuestions=[];
    // const AssignmentTestCases=[];
    // const AssignmentDeadline=[];
    // const testCaseCount=Assignment.map((doc)=>({
        
    // }))
    let today = new Date();
    // let dd = String(today.getDate()).padStart(2, '0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    // let yyyy = today.getFullYear();
    
    // today = yyyy + '-' + mm + '-' + dd;
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

const updateAssignment=async(req,res)=>{
    const {assignmentId}=req.params;
    const {question,deadline,testcases}=req.body;
    if(!assignmentId){
        res.json({message:"Assignment Id is required"});
    }
    
}
module.exports={SignUp,SignIn,fetchSubmissions,addAssignment,getNewAssignment}