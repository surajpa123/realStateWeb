import express from "express";
import {home} from "../controller/userController.js";
const router = express.Router();

router.get("/", home)


export default router