import express from "express";
import { printUser } from "../controller/user.controller.js";
const router = express.Router();

router.get("/test" , printUser);

export default router;