"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.sendMessage = void 0;
var socket_1 = require("../socket/socket");
var conversation_model_1 = require("../models/conversation.model");
var message_model_1 = require("../models/message.model");
var sendMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, receiverId, senderId, conversation, newMessage, receiverSocketId, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                message = req.body.message;
                receiverId = req.params.id;
                senderId = req.body.user._id;
                return [4 /*yield*/, conversation_model_1.default.findOne({
                        participants: { $all: [senderId, receiverId] },
                    })];
            case 1:
                conversation = _a.sent();
                if (!!conversation) return [3 /*break*/, 3];
                return [4 /*yield*/, conversation_model_1.default.create({
                        participants: [senderId, receiverId],
                    })];
            case 2:
                conversation = _a.sent();
                _a.label = 3;
            case 3:
                newMessage = new message_model_1.default({
                    senderId: senderId,
                    receiverId: receiverId,
                    message: message,
                });
                if (newMessage) {
                    conversation.messages.push(newMessage._id);
                }
                // await conversation.save();
                // await newMessage.save();
                // this will run in parallel
                return [4 /*yield*/, Promise.all([conversation.save(), newMessage.save()])];
            case 4:
                // await conversation.save();
                // await newMessage.save();
                // this will run in parallel
                _a.sent();
                receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
                if (receiverSocketId) {
                    // io.to(<socket_id>).emit() used to send events to specific client
                    socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
                }
                res.status(201).json(newMessage);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log("Error in sendMessage controller: ", error_1.message);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sendMessage = sendMessage;
var getMessages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userToChatId, senderId, conversation, messages, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userToChatId = req.params.id;
                senderId = req.body.user._id;
                return [4 /*yield*/, conversation_model_1.default.findOne({
                        participants: { $all: [senderId, userToChatId] },
                    }).populate("messages")];
            case 1:
                conversation = _a.sent();
                if (!conversation)
                    return [2 /*return*/, res.status(200).json([])];
                messages = conversation.messages;
                res.status(200).json(messages);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log("Error in getMessages controller: ", error_2.message);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMessages = getMessages;
