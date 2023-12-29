
import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
export const RegisterUser = async (req,res)=>{

const {userName,email,password}=req.body

try {   
const existUser = await User.find({email,userName});

if(existUser.length != 0){
    return res.json({msg:"User already exist"})
}
const hashedPassword = bcryptjs.hashSync(password,10);
const newUser = await new User({userName,email,password:hashedPassword});

await newUser.save();

res.status(201).json({msg:"User created sucessfully", newUser})
} catch (error) {
    res.status(500).json(error.message)
}


}