import Student from "../models/studentModel.js";


export const getStudents= async(req,res)=>{
    try{
        const users= await Student.find();
        res.status(200).json({users});

    }catch(error){
        res.status(500).send(error);
    }
}

export const addStudent= async(req,res)=>{
    try{
      const {name,college,status,dsascore,webdscore,reactscore}=req.body;
      const newStudent= await new Student({name,college,status,dsascore,webdscore,reactscore});

      await newStudent.save();

      res.status(201).json(newStudent);


    }catch(error)
    {
        res.status(500).send(error);
    }
}
