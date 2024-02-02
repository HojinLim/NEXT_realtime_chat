import User from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Register new user
export const registerUser = async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  const newUser = new User(req.body);
  const { name } = req.body;

  try {
    // addition new
    const oldUser = await User.findOne({ name: name });
    console.log(oldUser);
    if (oldUser) res.status(400).json({ error: "User already exists" });

    // changed
    const user = await newUser.save();
    const token = jwt.sign(
      { name: user.name, id: user._id },
      process.env.JWTKEY!,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error: any) {
    const error_msg = error as mongoose.Error;
    res.status(500).json({ message: error_msg });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name: name });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json({ error: "wrong password" });
      } else {
        const newToken = jwt.sign(
          { name: user.name, id: user._id },
          process.env.JWTKEY!,
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          { name: user.name, id: user._id },
          process.env.REFRESH_JWTKEY!,
          { expiresIn: "7d" }
        );
        res.setHeader("x-auth-token", newToken);
        res.setHeader("x-refresh-token", refreshToken);
        res
          .status(200)
          .json({ success: "Login success", user: { name: user.name } });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
// deleteUser 함수
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 비밀번호 확인 로직을 추가하세요.
    // 예를 들어, bcrypt 라이브러리를 사용하여 저장된 해시와 비교할 수 있습니다.

    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
