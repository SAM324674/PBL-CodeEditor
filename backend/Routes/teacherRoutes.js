const express=require('express');
// const Teacher = require('../Models/TeacherModel');
// const bcrypt=require('bcrypt');
// const { model } = require('mongoose');
// const { createTokenForUser } = require('../services/auth');
const { SignUp, SignIn, fetchSubmissions, addAssignment,getNewAssignment } = require('../Controllers/Teachers');
const router=express.Router();

router.post('/signup',SignUp);
router.post('/signin',SignIn);
router.get('/submissions',fetchSubmissions);
router.post('/newassignment',addAssignment);
router.get('/newassignment',getNewAssignment);
router.put('/newassignment/:assignmentId',);
module.exports=router;