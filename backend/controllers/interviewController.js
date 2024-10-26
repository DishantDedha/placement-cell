import Interview from "../models/interviewModel.js";
import Student from "../models/studentModel.js";

export const createInterview= async(req,res)=>{
    try{
         const newInterview= new Interview(req.body);
         await newInterview.save();

         res.status(201).send("interview created succesfully");

    }catch(error){
        res.status(500).send(error);
    }
}
export const getInterviews = async (req, res) => {
    try {
        // Fetch all interviews, 
        const interviews = await Interview.find();
        res.json(interviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch interviews' });
    }
}
export const allocateStudent= async(req,res)=>{
    try{
        const {company}=req.body;
        const {studentId}=req.body;
        const interview= await Interview.findOne({company});
       
        if(!interview.students.includes(studentId))
        {
            interview.students.push(studentId);
            await interview.save();
        }
        res.status(200).send('Student allocated successfully');

    }catch(error){
        res.status(500).send(error);
    }
}
export const markResult= async(req,res)=>{
    try{
        const {company,result}=req.body;
        const {studentId}=req.body;

        const interview= await Interview.findOne({company});
        console.log(studentId);
     

        const studentResult= await interview.results.find((r)=>r.student.toString()===studentId);
        console.log(studentResult);

        if(studentResult)
        {
            interview.results.result=result;
        }
        else{
            interview.results.push({student:studentId, result:result});
        }

        await interview.save();
        res.status(200).send('Result updated successfully');

    }catch(error){
        res.status(500).send(error);
    }
}
export const getInterviewDetails= async(req,res)=>{
    try{
        const interview = await Interview.findById(req.params.id).populate('students results.student');
        res.json(interview);

    }catch(error){
        res.status(500).send(error);
    }
}