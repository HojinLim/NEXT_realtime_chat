import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// protect 미들웨어
const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    // console.log("header:", req.headers.authorization);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];
        // console.log("token:", token);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWTKEY!);

        // Get user from the token
        req.body = await User.findById(
          (decoded as jwt.JwtPayload).id as jwt.JwtPayload
        );

        next();
      } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Not authorized, token failed" });
      }
    }

    if (!token) {
      // Check for refresh token

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Verify refresh token
          const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWTKEY!);

          // Get user from the refresh token
          req.body = await User.findById(
            (decoded as jwt.JwtPayload).id as jwt.JwtPayload
          );

          next();
        } catch (error) {
          console.log(error);
          res
            .status(401)
            .json({ error: "Not authorized, refresh token failed" });
        }
      } else {
        res.status(401).json({ error: "Not authorized, no token" });
      }
    }
  }
);

export default protect;
