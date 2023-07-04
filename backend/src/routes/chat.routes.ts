import { Router } from "express";
import ChatController from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.use(authenticate)

router.post("/chats", ChatController.chatGPT);

router.get("/chats-user/:id", ChatController.getUserChats);

router.get("/chats/:id", ChatController.getChat);

router.delete("/chats/:id", ChatController.deleteChat);


export default router;
