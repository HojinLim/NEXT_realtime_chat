const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");

const { app, server } = require("./socket/socket");
const connectToMongoDB = require("./db/connectToMongoDB");

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
 app.use(cookieParser());

 app.use("/api/auth", authRoutes);
 app.use("/api/messages", messageRoutes);
 app.use("/api/users", userRoutes);

 app.use(express.static(path.join(__dirname, "../client/build")));

 app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
     res.sendFile(path.join(__dirname, "../client/build/index.html"));
     });

     server.listen(PORT, () => {
       connectToMongoDB();
         console.log(`Server Running on port ${PORT}`);
         });
         
