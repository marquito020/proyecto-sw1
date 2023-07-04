import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import { dbConnet } from "./config/mongoose.js";
import chats from "./routes/chat.routes.js";
import auth from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use("/api", auth);
app.use("/api", chats);

const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server on port ${PORT}`));

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  // console.log(socket.connected); // true
});

io.on("hello from client", (...args) => {
  console.log(args);
});


dbConnet()
  .then(() => console.log("MongoDB Connect"))
  .catch((error) => console.log("Error MongoDB: ", error));

server.listen(PORT, () => console.log(`Server on port ${PORT}`));
