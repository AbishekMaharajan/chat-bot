import express from "express";

import chatBotRoutes from "../modules/chatBot/index.js";

const router = express.Router();

router.use("/chat-bot", chatBotRoutes);

export default router;
