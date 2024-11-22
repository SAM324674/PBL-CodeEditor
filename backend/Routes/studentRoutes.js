const express=require('express');
const { SignUp, SignIn, getNewAssignment } = require('../Controllers/Students');
// const Student = require('../Models/StudentModel');
// const bcrypt=require('bcrypt');
// const { model } = require('mongoose');
// const {createTokenForUser,validateToken}=require('../services/auth');

const router=express.Router();

router.post('/signup',SignUp);

router.post('/signin',SignIn);
router.get('/assignments',getNewAssignment);

module.exports=router;