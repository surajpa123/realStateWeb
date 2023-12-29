import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }, 
    avatar:{
        type:String, 
        default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
    }

}, {timestamps:true})

const User = mongoose.model("User", userSchema);

export default User