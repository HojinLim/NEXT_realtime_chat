"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = exports.getReceiverSocketId = void 0;
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var express_1 = require("express");
var app = (0, express_1.default)();
exports.app = app;
var server = http_1.default.createServer(app);
exports.server = server;
var io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});
exports.io = io;
var userSocketMap = {}; // {userId: socketId}
var getReceiverSocketId = function (receiverId) {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
io.on("connection", function (socket) {
    console.log("a user connected", socket.id);
    var userId = socket.handshake.query.userId;
    if (userId !== "undefined")
        userSocketMap[userId] = socket.id;
    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", function () {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
