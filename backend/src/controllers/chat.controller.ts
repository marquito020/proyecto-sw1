import { Request, Response } from "express";
import ChatService from "../services/chat.service.js";

const chatGPT = async (req: Request, res: Response) => {
  try {
    const responseIdAndText = await ChatService.chatGPT(req.body);
    res.status(200).json(responseIdAndText);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserChats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userChats = await ChatService.getUserChats(id);
    res.status(200).json(userChats);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chat = await ChatService.getChat(id);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chat = await ChatService.deleteChat(id);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  chatGPT,
  getUserChats,
  getChat,
  deleteChat,
};
