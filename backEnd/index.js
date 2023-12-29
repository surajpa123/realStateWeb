import express from "express";
import mongoose from "mongoose";
import env from "dotenv"
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js"
env.config();
const app = express();

app.use(express.json())


const DB_URL = process.env.DB_URL;




app.use("/api/user", userRoute);
app.use("/api/auth",authRoute)

app.listen(3000, ()=>{
    console.log("Server is running");
})

mongoose.connect(DB_URL).then((res)=>{
console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
})

