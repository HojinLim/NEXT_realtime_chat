import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Register new user
export const registerUser = async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { name } = req.body;
  try {
    // addition new
    const oldUser = await UserModel.findOne({ name: name });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

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

// Changed
// export const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await UserModel.findOne({ username: username });

//     if (user) {
//       const validity = await bcrypt.compare(password, user.password);

//       if (!validity) {
//         res.status(400).json("wrong password");
//       } else {
//         const token = jwt.sign(
//           { username: user.username, id: user._id },
//           process.env.JWTKEY!,
//           { expiresIn: "1h" }
//         );
//         res.status(200).json({ user, token });
//       }
//     } else {
//       res.status(404).json("User not found");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
