import { error } from "node:console";
import { generateToken } from "../lib/utils";
import user from "../models/User";
import bcrypt from "bcryptjs";
import { flushCompileCache } from "node:module";
import { use } from "react";

//signup a new user



export const signup = async (req,res)=>{
  const {fullName,email,passwrod,bio}= req.body;

  try{
if(!fullName|| !email || !passwrod || !bio){
    return res.json({succes : false,message :"Missing details"})
}
const user = awiat User.findOne({email});
if(user){
    return res.json({success: flase , message: " Account already exists"})
}
const salt = awiat bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(passwrod,salt);

const newUser = await User.create({
    fullName, email, passwrod:hashPassword,bio
});
const token = generateToken(newUser);
    res.json({succes: true , userData:newUser,token,mesaage:"Account created successfully"});


  }catch(eror){
    console.log(error.message);
    res.json({succes:false,message:error.message})
  }

}

// Login 

export const Login = async  (req,res)=>{
try {
  const {email,passwrod}=req.body;
  const userData = await User.findOne({email});

  const isPasswordCorrect = await bcrypt.compare(passwrod,userData.passwrod);

  if(!isPasswordCorrect){
    return res.json({succes:false , mesage:"Invalid credentials"});

  }
  const token = generateToken(userData._id);
     res.json({succes: true , userData ,token,mesaage:"Login successfully"});


}catch(eror){
    console.log(error.message);
    res.json({succes:false,message:error.message})
  }






}