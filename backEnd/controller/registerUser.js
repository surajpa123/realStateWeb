
import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
export const RegisterUser = async (req,res,next)=>{

const {userName,email,password}=req.body

try {   
const existUser = await User.find({email,userName});

if(existUser.length != 0){
    return res.json({sucess:false,msg:"User already exist"})
}
const hashedPassword = bcryptjs.hashSync(password,10);
const newUser = await new User({userName,email,password:hashedPassword});

await newUser.save();

res.status(201).json({sucess:true,msg:"User created sucessfully", newUser})
} catch (error) {
    // next(error)
    res.json({error,sucess:false})
}
}

export const SignIn = async (req,res) =>{

    const {email,password}=req.body
    
    try {
    const vaildUser = await User.findOne({email});

    if(!vaildUser){
        return res.status(404).json({msg:"User not found",sucess:false})
    }

    const valildPassword = bcryptjs.compareSync(password,vaildUser.password);
    
    if(!valildPassword){
        return res.status(401).json({msg:"Invaild Password !",sucess:false})
    }

    const token = jwt.sign({id:vaildUser._id},process.env.SecretKey);
    res.cookie('acess_token', token, {httpOnly:true,}).status(200).json({sucess:true,vaildUser}
    )




    } catch (error) {
        res.json({error,sucess:false})
    }




}

export const google = async (req,res)=>{

    try {

    const user = await User.findOne({email:req.body.email});

    if(user){
    const token = jwt.sign({id:user._id},process.env.SecretKey);
    res.cookie('acess_token', token, {httpOnly:true,}).status(200).json({sucess:true,user})

    }else{

     const generatePassword = Math.random().toString(36).slice(-8);

     const hashedPassword = bcryptjs.hashSync(generatePassword,10);

     const newUser = new User({userName:req.body.name.split(" ").join("").toLowerCase(), email:req.body.email, password:hashedPassword,avatar:req.body.photo});
      
     await newUser.save();

     const token = jwt.sign({id:newUser._id},process.env.SecretKey);

     res.cookie('acess_token', token, {httpOnly:true,}).status(200).json({sucess:true,newUser})




    }


        
    } catch (error) {
        
    }

}