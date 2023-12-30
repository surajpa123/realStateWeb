import bcrypjs from "bcryptjs"
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";
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


export const getUserListings = async (req,res)=>{


try {
  let listings = await Listing.find({userRef:req.params.id});

  if(listings.length == 0) return res.json({sucess:false,msg:"No listings found"});

  res.status(200).json({sucess:true,listings});

  
} catch (error) {

  res.json({error})
  
}










}
