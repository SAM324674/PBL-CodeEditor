const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const port=8000;
const studentRoutes=require('./Routes/studentRoutes');
const teacherRoutes=require('./Routes/teacherRoutes');
const codeRunRoutes=require('./Routes/codeRunRoutes');
require ('dotenv').config();
//Middleware
app.use(cors());
app.use(bodyParser.json());

//connect to mongoose
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected to MongoDB"))
.catch(err=>console.error("failed to connect to MongoDB",err));


const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(
    cors(corsOptions)
)
//define routes
// app.get('/',(req,res)=>{
//     res.render('home')
// })
app.use('/students',studentRoutes);
app.use('/teachers',teacherRoutes);
app.use('/codeEditor',codeRunRoutes);
//listen to port 
app.listen(port,()=>console.log(`Server Started : http://localhost:${port}/`))