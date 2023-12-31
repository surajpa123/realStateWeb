import express from "express";
import { createListing } from "../controller/listingController.js";
import { verifyToken } from "../middleWare/VerifyToken.js";
import { getListing,getListings } from "../controller/listingController.js";


const router = express.Router();


router.post("/create",verifyToken, createListing);

router.get("/get/:id", getListing);

router.get("/get", getListings)



export default router