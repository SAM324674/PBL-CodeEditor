const express=require('express');
const {execute}=require('../Controllers/executeCode');
// const execute =require('../utils/')
const router=express.Router();

router.post('/',execute);

module.exports=router;