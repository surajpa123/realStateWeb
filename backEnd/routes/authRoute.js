import express from "express";
import { RegisterUser, SignIn } from "../controller/registerUser.js";

const router = express.Router();


router.post("/signup", RegisterUser)

router.post("/signin", SignIn)


export default router