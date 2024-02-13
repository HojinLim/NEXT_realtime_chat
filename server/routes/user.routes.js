"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var protectRoute_1 = require("../middleware/protectRoute");
var router = express_1.default.Router();
router.get("/", protectRoute_1.default, user_controller_1.getUsersForSidebar);
exports.default = router;
