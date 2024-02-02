import express from "express";
import { createServer } from "http";

import dotenv from "dotenv";
import cors from "cors";

// routes
import AuthRoute from "./routes/AuthRoute";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
const server = createServer(app);

// body 데이터를 json형식으로 사용:
//json 형태의 데이터를 해석- body-parser 기능 포함
app.use(express.json());
// x-www-form-urlencoded 형태 데이터 해석
app.use(express.urlencoded({ extended: false }));

const MONGO_KEY = process.env.MONGO_URI!;
mongoose
  .connect(MONGO_KEY)
  .then(() => console.log("MongoDB connected !!"))
  .catch((err) => console.log("mogo error", err));

app.use("/api/auth", AuthRoute);

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// let rooms: string[] = [];

// const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
//   cors: {
//     // origin: ["http://localhost:3000/"],
//     origin: "*",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// instrument(io, {
//   auth: false,
//   // mode: "development",
// });
// io.on(
//   "connection",
//   (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
//     //  방 생성
//     socket.on("createRoom", (data) => {
//       console.log(data.room);
//       if (rooms.includes(data.room)) {
//         console.log("Room name is already exist");
//         socket.emit("error_roomExist", { msg: "Room name is already exist" });
//         return;
//       }
//       console.log(data.room);
//       rooms.push(data.room);
//       if (!data.room) {
//         // throw new Error("Room name is required");
//       } else {
//         io.emit("sendRoomLists", { rooms });
//       }
//     });
//     socket.on("notifyEnterRoom", (data) => {
//       console.log("you joined", data.room);
//       socket.join(data.room);
//       socket.emit("notifyEnterRoom", {
//         name: data.name,
//         room: data.room,
//       });
//     });

//     socket.on("disconnect", () => {
//       console.log("user disconnected");
//     });
//   }
// );
