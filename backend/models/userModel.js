import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save', async function(next){
    try{
         const salt= await bcrypt.genSalt(10);
         const hashedPassword= await bcrypt.hash(this.password,salt);
         this.password=hashedPassword;
         next();
    }catch(error){
        next(error);
    }
})

const User= new mongoose.model('User',userSchema);

export default User;