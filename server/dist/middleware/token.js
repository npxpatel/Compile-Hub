"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { JWT_SECRET } from '../config';
const JWT_SECRET = "nirajkl";
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: "Auth failed",
        });
    }
    const jwtToken = authHeader.split(' ')[1];
    try {
        const decodedPayload = jsonwebtoken_1.default.verify(jwtToken, JWT_SECRET);
        if (decodedPayload._id) {
            req._id = decodedPayload._id;
            next();
        }
        else {
            return res.status(403).json({
                msg: "Auth failed from token2",
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            msg: "Invalid token/expired",
        });
    }
};
exports.verifyToken = verifyToken;
