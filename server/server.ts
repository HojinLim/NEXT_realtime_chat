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

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "../client/build/index.html"));
   });

   server.listen(PORT, () => {
     connectToMongoDB();
       console.log(`Server Running on port ${PORT}`);
       });
