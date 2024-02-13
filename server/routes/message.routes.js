"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var message_controller_1 = require("../controllers/message.controller");
var protectRoute_1 = require("../middleware/protectRoute");
var router = express_1.default.Router();
router.get("/:id", protectRoute_1.default, message_controller_1.getMessages);
router.post("/send/:id", protectRoute_1.default, message_controller_1.sendMessage);
exports.default = router;
