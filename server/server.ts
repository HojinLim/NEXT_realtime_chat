import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ClientToServerEvents, Message, ServerToClientEvents } from "../typings";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./routes/AuthRoute";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGO_KEY = process.env.MONGO_URI!;
mongoose
  .connect(MONGO_KEY)
  .then(() => console.log("MongoDB connected !!"))
  .catch((err) => console.log("mogo error", err));

app.use("/api/auth", AuthRoute);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    methods: ["GET", "POST"],
    origin: '*',
  }
});

// const chatRoom = io.of("/chatRoom");
io.on('connection', socket => {


  console.log('a user connected, socket id:', socket.id);

  socket.on('clientMsg', (msg: string) => {
    console.log('Server got message: ' + msg);
    io.emit('serverMsg', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


httpServer.listen(5000);
// server.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`);
// });