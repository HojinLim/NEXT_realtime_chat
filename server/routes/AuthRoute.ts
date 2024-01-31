import express from "express";
import { registerUser } from "../controllers/AuthController";
// import { loginUser, registerUser } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
// router.post("/login", loginUser);

export default router;
