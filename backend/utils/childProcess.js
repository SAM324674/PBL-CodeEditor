const {exec, spawn}=require('child_process');
const { stdout } = require('process');

const Execute=(code)=>{
   return new Promise((resolve, reject) => {
        const process=spawn('python',['-c',code]);
        let output='';
        let error='';
        process.stdout.on('data',(data)=>{
            output+=data;
            console.log(`stdout:${data}`);
    
        });
        process.stderr.on('data',(data)=>{
            error+=data;
            console.error(`stderr:${data}`);
            
        });
        process.on('close',(code)=>{
            resolve(output);
            reject(error);
            console.log(`child process exited with code ${code}`);
        });

   })
}

module.exports={Execute};