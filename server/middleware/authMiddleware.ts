import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// protect 미들웨어
const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWTKEY!);

        console.log((decoded as jwt.JwtPayload).id);
        // Get user from the token
        req.body = await User.findById(
          (decoded as jwt.JwtPayload).id as jwt.JwtPayload
        );
        console.log(req.body);
        next();
      } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Not authorized, token failed" });
      }
    }

    if (!token) {
      res.status(401).json({ error: "Not authorized, no token" });
    }
  }
);

export default protect;
