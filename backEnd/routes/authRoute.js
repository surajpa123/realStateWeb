import express from "express";
import { RegisterUser } from "../controller/registerUser.js";

const router = express.Router();


router.post("/signup", RegisterUser)

export default router