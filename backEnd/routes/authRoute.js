import express from "express";
import { RegisterUser, SignIn, google } from "../controller/registerUser.js";

const router = express.Router();


router.post("/signup", RegisterUser)

router.post("/signin", SignIn);

router.post("/google", google)



export default router