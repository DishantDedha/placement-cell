import mongoose from "mongoose";

const interviewSchema= new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    date:{
        type: Date
    },
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }],
    results:[{
        student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        },
        result:{
            type:String,
            enum:['PASS','FAIL','ON_HOLD','DIDNOT_ATTEMPT'],
            default:'ON_HOLD'

        }

    }]

});

const Interview= new mongoose.model('Interview',interviewSchema);

export default Interview;