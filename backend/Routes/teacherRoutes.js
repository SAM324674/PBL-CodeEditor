const express=require('express');
// const Teacher = require('../Models/TeacherModel');
// const bcrypt=require('bcrypt');
// const { model } = require('mongoose');
// const { createTokenForUser } = require('../services/auth');
const { SignUp, SignIn, fetchSubmissions } = require('../Controllers/Teachers');
const router=express.Router();

router.post('/signup',SignUp);

router.post('/signin',SignIn);
router.get('/submissions',fetchSubmissions);

module.exports=router;