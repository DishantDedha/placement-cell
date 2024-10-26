import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();


export const userSignUp=async(req,res)=>{
    try{
        const {email, password}=req.body;

        const newUser= await new User({email,password});
        await newUser.save();

        res.status(201).send("User created successfully");

    }catch(error){
        res.status(400).send(error);
    }
}

export const userSignIn=async(req,res)=>{
    try{
          const {email,password}=req.body;
          const user= await User.findOne({email});
          if (!user) {
            return res.status(400).send('Invalid email or password');
          } 
          const isMatch= await bcrypt.compare(password,user.password);
          if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }
        const token= jwt.sign({userId:user._id},process.env.JWT_SECRET,{ expiresIn:"1h"});

        res.json({token});


    
}
    catch(error){
        res.status(400).send(error);
    }
}