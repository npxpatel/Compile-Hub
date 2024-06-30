import { NextFunction , Request, Response  } from "express";  
import jwt, {JsonWebTokenError} from "jsonwebtoken";

export interface Auth extends Request {
    _id?: number;
}

export const verifyToken = (req: Auth, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Access Denied.");

    jwt.verify(
        token,
        process.env.JWT_KEY!,
        (err: JsonWebTokenError | null, DecodedData: any) => {
          if (err) {
            return res.status(401).send({ message: "Access Denied." });
          }
          req._id = DecodedData._id;
          next();
        }
    )

}
