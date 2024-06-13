import express from "express";
import { getUserForSidebar } from "../controllers/user.controllers.js";
import { Authenticated } from "../middleware/Auth.js";

const router = express.Router();

router.get("/", Authenticated, getUserForSidebar)

export default router;