import { error } from "node:console";
import { generateToken } from "../lib/utils";
import user from "../models/User";
import bcrypt from "bcryptjs";

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