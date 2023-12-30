import express from "express";
import {getUserListings, home,updateUser} from "../controller/userController.js";
import { verifyToken } from "../middleWare/VerifyToken.js";
const router = express.Router();

router.get("/", home);

router.post("/update/:id",verifyToken, updateUser);

router.get("/listings/:id",verifyToken, getUserListings)



export default router