"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAnonymous = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { JWT_SECRET } from '../config';
const JWT_SECRET = "nirajkl";
const verifyTokenAnonymous = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("Auth failed from anonymous token");
        return res.status(401).json({
            msg: "Auth failed from anonymous token",
        });
    }
    const jwtToken = authHeader.split(' ')[1];
    try {
        const decodedPayload = jsonwebtoken_1.default.verify(jwtToken, JWT_SECRET);
        console.log(jwtToken + "from anonymous token");
        console.log(decodedPayload);
        if (decodedPayload) {
            req._id = decodedPayload._id;
            console.log(req._id + "from anonymous token");
            next();
        }
        else {
            console.log(authHeader);
            return res.status(403).json({
                msg: "Auth failed from anonyms token",
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            msg: "Invalid token/expired",
        });
    }
};
exports.verifyTokenAnonymous = verifyTokenAnonymous;
