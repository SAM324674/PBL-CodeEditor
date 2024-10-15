const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const port=8000;
const studentRoutes=require('./Routes/studentRoutes');
const teacherRoutes=require('./Routes/teacherRoutes');
require ('dotenv').config();
//Middleware
app.use(cors());
app.use(bodyParser.json());

//connect to mongoose
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected to MongoDB"))
.catch(err=>console.error("failed to connect to MongoDB",err));


app.use(
    cors({
        origin:'http://localhost:5173/',
        credentials:true,
    })
)
//define routes
// app.get('/',(req,res)=>{
//     res.render('home')
// })
app.use('/students',studentRoutes);
app.use('/teachers',teacherRoutes);
//listen to port 
app.listen(port,()=>console.log(`Server running at port http://localhost:${port} successfully`))