import { Schema, model, Types } from "mongoose";
import { Chat } from "../interfaces/chat.interface.js";

const ChatSchema = new Schema<Chat>(
  {
    userId: { type: String, required: true },
    messages: [
      {
        message: { type: String, required: true },
        responseText: { type: String, required: true },
        messageId: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ChatModel = model("Chat", ChatSchema);

export default ChatModel;
