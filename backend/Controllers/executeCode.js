const {Execute}=require('../utils/childProcess');

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

module.exports={execute};