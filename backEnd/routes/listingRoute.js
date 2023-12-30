import express from "express";
import { createListing } from "../controller/listingController.js";
import { verifyToken } from "../middleWare/VerifyToken.js";
import { getListing } from "../controller/listingController.js";

const router = express.Router();


router.post("/create",verifyToken, createListing);

router.get("/get/:id", getListing)


export default router