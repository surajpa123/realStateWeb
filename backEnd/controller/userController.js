import bcrypjs from "bcryptjs"
import User from "../models/userModel.js";
export const home = async (req,res)=>{
    res.json({msg:"Hey welcome to the website !"})
}

export const updateUser = async (req,res)=>{

    if(req.user.id !== req.params.id) return res.json({msg:"You can only update your own account"});

    try {

      if(req.body.password){
        req.body.password = bcrypjs.hashSync(req.body.password,10);
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar
        }
      }, {new:true})


   res.json({sucess:true,msg:"Updated user sucessfully",user:updatedUser})

        
    } catch (error) {


        res.json({error})

        
    }

}
