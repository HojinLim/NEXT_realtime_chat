import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";


import { app, server } from "./socket/socket";
import connectToMongoDB from "./db/connectToMongoDB";

const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});







// import { app, server } from "./socket/socket";

// import express from "express";
// import { createServer } from "http";

// import dotenv from "dotenv";
// import cors from "cors";
// import AuthRoute from "./routes/authRoute";
// import mongoose from "mongoose";

// dotenv.config();
// const PORT = process.env.PORT || 5000;

// // const app = express();
// const httpServer = createServer(app);
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const MONGO_KEY = process.env.MONGO_URI!;
// mongoose
//   .connect(MONGO_KEY)
//   .then(() => console.log("MongoDB connected !!"))
//   .catch((err) => console.log("mogo error", err));

// app.use("/api/auth", AuthRoute);

// // const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
// //   connectionStateRecovery: {
// //     // the backup duration of the sessions and the packets
// //     maxDisconnectionDuration: 2 * 60 * 1000,
// //     // whether to skip middlewares upon successful recovery
// //     skipMiddlewares: true,
// //   },
// //   cors: {

// //     methods: ["GET", "POST"],
// //     origin: '*',
// //   }
// // });

// // const chatRoom = io.of("/chatRoom");
// // io.on('connection', socket => {

// //   if (socket.recovered) {
// //     console.log('socket recovered');
// //   }



// //   console.log('rooms:', socket.rooms)

// //   console.log('user connected, server: socket id:', socket.id);
// //   socket.join('room1');

// //   console.log('rooms:', socket.rooms)
// //   socket.leave('room1');
// //   console.log('rooms:', socket.rooms)

// //   socket.on('clientMsg', (msg: Message) => {
// //     console.log('Server got message: ' + msg);

// //     io.emit('serverMsg', msg);
// //   });

// //   socket.on('disconnect', async () => {
// //     console.log('user disconnected');
// //   });
// // });


// httpServer.listen(5000);
// // server.listen(PORT, () => {
// //   console.log(`listening on *:${PORT}`);
// // });