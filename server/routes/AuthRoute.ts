import express from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/AuthController";
import protect from "../middleware/authMiddleware";
// import { loginUser, registerUser } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/delete", protect, deleteUser);

export default router;
