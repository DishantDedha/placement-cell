import mongoose from "mongoose";;



const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    college:{
        type:String
    },
    status:{
        type:String,
        enum:['placed' , 'not_placed'],
        default: 'not_placed'
    },
    dsascore:{
        type:Number,
        required:true
    },
    webdscore:{
        type:Number,
        required:true
    },
    reactscore:{
        type:Number,
        required:true
    }

});
const Student = mongoose.model('Student',studentSchema);
export default Student;
