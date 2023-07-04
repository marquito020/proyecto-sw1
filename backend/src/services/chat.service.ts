import "dotenv/config";
import { ChatGPTAPI } from "chatgpt";
import { io } from "../index.js";
import { RequestChat } from "../interfaces/chat.interface.js";
import ChatModel from "../models/chat.model.js";

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const chatGPT = async ({ _id, userId, message }: RequestChat) => {
  if (!_id) {
    const newChat = await ChatModel.create({ userId });
    _id = newChat._id.toString();
  }

  const chat = await ChatModel.findOne({ _id });
  const chatMessages = chat!.messages;

  let parentMessageId = undefined;
  if (chatMessages.length > 0) {
    parentMessageId = chatMessages[chatMessages.length - 1].messageId;
  }

  const messagePush = "Creame un cuentro con estas caracteristicas: " + message;

  const response = await api.sendMessage(messagePush, {
    parentMessageId,
    onProgress: (partialResponse) => {
      io.emit("partialResponse", partialResponse.text);
    },
  });


  await ChatModel.findByIdAndUpdate(_id, {
    $push: {
      messages: {
        message: messagePush,
        messageId: response.id,
        responseText: response.text,
      },
    },
  });

  const responseIdAndText = { _id, responseText: response.text };
  return responseIdAndText;
};

const getUserChats = async (userId: string) => {
  const userChats = await ChatModel.find({ userId: userId });
  return userChats;
};

const getChat = async (_id: string) => {
  const chat = await ChatModel.findOne({ _id: _id });
  return chat;
};

const deleteChat = async (_id: string) => {
  const chat = await ChatModel.findOneAndDelete({ _id: _id });
  return chat;
};

export default { chatGPT, getUserChats, getChat, deleteChat };

// import { Configuration, OpenAIApi } from "openai";

// const openai = new OpenAIApi(configuration);
// const response = await openai.createChatCompletion(
//   {
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: message }],
//   }
// );

// console.log(response.data.choices[0].message)

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY || "API KEY",
// });
