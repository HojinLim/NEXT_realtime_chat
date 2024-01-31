import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { instrument } from "@socket.io/admin-ui";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../client/src/types/typings";

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();
app.use(cors());
const server = createServer(app);

let rooms: string[] = [];

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    // origin: ["http://localhost:3000/"],
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
  // mode: "development",
});
io.on(
  "connection",
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    //  방 생성
    socket.on("createRoom", (data) => {
      console.log(data.room);
      if (rooms.includes(data.room)) {
        console.log("Room name is already exist");
        socket.emit("error_roomExist", { msg: "Room name is already exist" });
        return;
      }
      console.log(data.room);
      rooms.push(data.room);
      if (!data.room) {
        // throw new Error("Room name is required");
      } else {
        io.emit("sendRoomLists", { rooms });
      }
    });
    socket.on("notifyEnterRoom", (data) => {
      console.log("you joined", data.room);
      socket.join(data.room);
      socket.emit("notifyEnterRoom", {
        name: data.name,
        room: data.room,
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  }
);

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
