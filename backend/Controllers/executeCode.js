const {Execute}=require('../utils/childProcess');
const {validateToken}=require('../services/auth');
const Student = require('../Models/StudentModel');
const Submit=require('../Models/SubmitModel');
const execute=async (req,res)=>{
    const {sourceCode}=req.body;
    console.log(req.body);
    try{
        const output=await Execute(sourceCode);
        // const formattedOutput=output.replace(/\n/g,'<br>')
        console.log(`Output:[${output}]`);
        res.status(200).json({output});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Code execution failed'});
    }

};


const submit=async(req,res)=>{
    const {evaluation,questionId}=req.body;
    //authHeader to get the authorisation from frontend
    console.log("headers received:",req.headers)
    const AuthHeader=req.headers.authorization;
    console.log("Auth Header:",AuthHeader);
    if(!AuthHeader){
        return res.status(401).json({message:"Authorisation header missing"});
    }
    //token to get token from authHeader as Bearer is in [0] and token is in [1]
    const token=req.headers.authorization.split(' ')[1];
    console.log("token:",token);
    //decode to validate
    if(!token){
        return res.status(401).json({
            message:"Token missing"
        });
    }
    const decode=validateToken(token);
    console.log("decode:",decode);
    //getting student id from the decoded token
    const studentId=decode._id;
    console.log(studentId);
    //getting teacherId of the student
    const student=await Student.findById(studentId);
    if(!student){
        res.status(400).json({
            message:"Student not found"
        })
    }
    const teacherId=student.teacherId;
        try {
            const newSubmission=await Submit.create({
                questionId,
                studentId,
                teacherId,
                firstName:student.firstName,
                lastName:student.lastName,
                evaluation
            })
            console.log('submission:',newSubmission);
            res.status(200).json({
                message:"submission successfull",
                submission:newSubmission
            })
        } catch (error) {
            console.error("error",error);
            res.status(500).json({
                message:"error in submitting",
                error:error.message
            })
        }

    // return res.json({
    //     message:"verified",
    //     token
    // });
}
module.exports={execute,submit};