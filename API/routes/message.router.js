import express from "express"
import { sendMessage, getMessages } from "../controllers/message.controller.js"
import { Authenticated } from "../middleware/Auth.js";

const router = express.Router();

router.post('/send/:id', Authenticated, sendMessage)
router.get('/:id', Authenticated, getMessages)

export default router;
