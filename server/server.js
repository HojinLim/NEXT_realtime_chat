"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cookie_parser_1 = require("cookie-parser");
var auth_routes_1 = require("./routes/auth.routes");
var message_routes_1 = require("./routes/message.routes");
var user_routes_1 = require("./routes/user.routes");
var socket_1 = require("./socket/socket");
var connectToMongoDB_1 = require("./db/connectToMongoDB");
var PORT = process.env.PORT || 5000;
dotenv_1.default.config();
socket_1.app.use(express_1.default.json()); // to parse the incoming requests with JSON payloads (from req.body)
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use("/api/auth", auth_routes_1.default);
socket_1.app.use("/api/messages", message_routes_1.default);
socket_1.app.use("/api/users", user_routes_1.default);
socket_1.app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
socket_1.app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../client/build/index.html"));
});
socket_1.server.listen(PORT, function () {
    (0, connectToMongoDB_1.default)();
    console.log("Server Running on port ".concat(PORT));
});
