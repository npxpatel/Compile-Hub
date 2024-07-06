import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config';

export interface Auth extends Request {
    _id?: number;
}

export const verifyTokenAnonymous = (req: Auth, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader ) {
    console.log("Auth failed from anonymous token");
    return res.status(401).json({
      msg: "Auth failed from anonymous token",
    });
  }

  const jwtToken = authHeader.split(' ')[1];

  try {
    const decodedPayload = jwt.verify(jwtToken, JWT_SECRET) as jwt.JwtPayload;
    console.log(jwtToken + "from anonymous token")
    console.log(decodedPayload)

    if (decodedPayload) {
      req._id = decodedPayload._id;
      console.log(req._id + "from anonymous token")
      next();
    } else {
      console.log(authHeader)
      return res.status(403).json({
        msg: "Auth failed from anonyms token",
      });
    }
  } catch (error) {
   
    return res.status(401).json({
     
      msg: "Invalid token/expired",
    });
  }
}
