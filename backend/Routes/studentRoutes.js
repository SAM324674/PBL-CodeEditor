const express=require('express');
const { SignUp, SignIn } = require('../Controllers/Students');
// const Student = require('../Models/StudentModel');
// const bcrypt=require('bcrypt');
// const { model } = require('mongoose');
// const {createTokenForUser,validateToken}=require('../services/auth');

const router=express.Router();

router.post('/signup',SignUp);

router.post('/signin',SignIn);

module.exports=router;