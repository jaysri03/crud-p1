const express=require('express');
const mongoose=require('mongoose');
//const mongodb=require('mongodb')
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

const StudentModel=require("./models/student");



mongoose.connect("mongodb://127.0.0.1:27017/student");

//mongodb.connect("mongodb+srv://admin:admin@cluster0.jjcj38o.mongodb.net/?retryWrites=true&w=majority");
app.post("/insert",async(req,res)=>{

    
    const studentName=req.body.studentName
    const coures=req.body.coures

    const student=new StudentModel({
       
        studentName:studentName,
        coures:coures
    });
    try{
        await(student.save());
    }catch(err){
        console.log(err);
    }
});

app.get("/read",async(req,res)=>{
         StudentModel.find({},(err,result)=>{
      if(err){
           res.send(err)
           
     }
     // console.log(result);
      res.send(result);
   });
          });

  app.put("/update",async(req,res)=>{

    const newstudentName=req.body.newstudentName;
    const id=req.body.id;

 
    try{
      await StudentModel.findById(id,(err,updatedstudent) => {
            updatedstudent.studentName=newstudentName;
            updatedstudent.save();
            res.send("update");
        });
    }catch(err){
        console.log(err);
    }
});
app.delete("/delete/:id", async(req,res) => {
    const id=req.params.id;
    await  StudentModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});
app.listen(3001, () =>{
    console.log("server is running");
});