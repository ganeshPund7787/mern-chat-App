import express from "express";
import { getUserForSidebar, updateUser } from "../controllers/user.controllers.js";
import { Authenticated } from "../middleware/Auth.js";

const router = express.Router();

router.get("/", Authenticated, getUserForSidebar)
router.put("/update-user/:id", Authenticated, updateUser)


export default router;