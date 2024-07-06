import express from "express";
import {
  login,
  logout,
  signup,
  getUser,
} from "../controllers/userController";
import { verifyToken } from "../middleware/token";
import { getMyCodes } from "../controllers/compilerController";
export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/user-details", verifyToken, getUser);
userRouter.get("/my-codes", verifyToken, getMyCodes);