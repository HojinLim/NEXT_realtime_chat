import User from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Register new user
export const registerUser = async (req: Request, res: Response) => {
  const { name, password, gender } = req.body;


  if (name.length < 3) return res.status(400).json({ status: 'error', message: "Username must be at least 3 characters long" });
  if (password.length < 4) return res.status(400).json({ status: 'error', message: "Password must be at least 4 characters long" });

  const salt = await bcrypt.genSalt(10);


  const hashedPass = await bcrypt.hash(password, salt);
  req.body.password = hashedPass;



  const boyProfileImage = `https://avatar.iran.liara.run/public/boy?username=${name}`;
  const girlProfileImage = `https://avatar.iran.liara.run/public/girl?username=${name}`;

  const newUser = new User({
    name,
    password: hashedPass,
    gender,
    profileImage: gender === "male" ? boyProfileImage : girlProfileImage,
  });

  try {
    const oldUser = await User.findOne({ name: name });
    console.log(oldUser);
    if (oldUser) return res.status(400).json({ status: 'error', message: "User already exists" });

    const user = await newUser.save();

    return res.status(200).json({ user, status: 'success', message: "User created successfully" });
  } catch (error: any) {
    const error_msg = error as mongoose.Error;
    return res.status(500).json({ status: 'error', message: error_msg });
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
        return res.status(400).json({ status: 'error', message: "wrong password" });
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
        return res
          .status(200)
          .json({ status: 'success', message: "Login success", user: { name: user.name, profileImage: user.profileImage } });
      }
    } else {
      return res.status(404).json({ status: 'error', message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err });
  }
};

// deleteUser function
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user) {
      return res.status(404).json({ status: 'error', message: "User not found" });
    }

    await User.deleteOne({ _id: user._id });

    return res.status(200).json({ status: 'success', message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
