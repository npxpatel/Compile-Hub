import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Auth } from "../middleware/token";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const usernameRegex = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username: username }, { email: email }] },
    });
     
    if(existingUser) {
      return res.status(400).send({ message: "Username or email already exists" });
    }
    
    if(!usernameRegex.test(username)) {
      return res.status(400).send({ message: "Invalid username" });
    }

    if(!emailRegex.test(email)) {
        return res.status(400).send({ message: "Invalid email" });
        }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const jwtToken = jwt.sign(
        {
            _id : user.id,
            email : user.email,
        },
        process.env.JWT_KEY!,
        {
            expiresIn: "1d",
        }
    )

    res.cookie("token", jwtToken, {
        httpOnly: true,
        path: "/",
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        sameSite: "lax"
    });

    return res.status(200).send({
        username : user.username,
        picture: user.picture,
        email: user.email,

    })
    }

      catch (err) {
         return res.status(500).send({ message: "Internal server error" });
      }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const jwtToken = jwt.sign(
      {
        _id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", jwtToken, {
        httpOnly: true,
        path: "/",
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        sameSite: "lax"
    });

    return res.status(200).send({
      username: user.username,
      picture: user.picture,
      email: user.email,
    });

    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });

    }
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).send({ message: "Logged out successfully" });
}

export const getUser = async (req: Auth, res: Response) => {
  const userId = req._id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({
      username: user.username,
      picture: user.picture,
      email: user.email,
    });

  } catch (err) {
    return res.status(500).send({ message: "Cannot fetch user details" });
  }
};