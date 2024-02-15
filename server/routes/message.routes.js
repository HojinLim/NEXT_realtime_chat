const express = require("express");
const {
  getMessages,
  sendMessage,
} = require("../controllers/message.controller.js");
const protectRoute = require("../middleware/protectRoute.js");

const router = express.Router();

router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

module.exports = router;
