const express=require('express');
const {execute, submit}=require('../Controllers/executeCode');
// const execute =require('../utils/')
const router=express.Router();

router.post('/',execute);
router.post('/submit',submit);
module.exports=router;