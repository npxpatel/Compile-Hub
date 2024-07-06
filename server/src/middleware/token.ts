import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// import { JWT_SECRET } from '../config';
const JWT_SECRET = "nirajkl" ;

export interface Auth extends Request {
    _id?: number;
}

export const verifyToken = (req: Auth, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      msg: "Auth failed",
    });
  }
    
  const jwtToken = authHeader.split(' ')[1];


  try {
    const decodedPayload = jwt.verify(jwtToken, JWT_SECRET) as jwt.JwtPayload;

    if (decodedPayload._id) {
      req._id = decodedPayload._id;
      next();
    } else {
      return res.status(403).json({
        msg: "Auth failed from token2",
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token/expired",
    });
  }
}
