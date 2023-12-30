import express from "express";
import {home,updateUser} from "../controller/userController.js";
import { verifyToken } from "../middleWare/VerifyToken.js";
const router = express.Router();

router.get("/", home);

router.post("/update/:id",verifyToken, updateUser)


export default router