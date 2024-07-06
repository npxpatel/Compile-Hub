"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logout = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = "nirajkl";
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ username: username }, { email: email }] },
    });
    if (!usernameRegex.test(username)) {
        return res.status(400).send({ message: "Invalid username" });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: "Invalid email" });
    }
    if (existingUser) {
        return res
            .status(400)
            .send({ message: "Username or email already exists" });
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
        },
    });
    const token = jsonwebtoken_1.default.sign({
        _id: user.id,
        email: user.email,
    }, JWT_SECRET, {
        expiresIn: "1d",
    });
    console.log(token);
    // res.cookie("token", jwtToken, {
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //   sameSite: "lax",
    // });
    return res.status(200).send({
        token: token
    });
};
exports.signup = signup;
const login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        let user = undefined;
        if (userId.includes("@")) {
            user = await prisma.user.findFirst({
                where: { email: userId },
            });
        }
        else {
            user = await prisma.user.findFirst({
                where: { username: userId },
            });
        }
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user.id,
            email: user.email,
        }, JWT_SECRET, {
            expiresIn: "1d",
        });
        // res.cookie("token", jwtToken, {
        //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        //   httpOnly: true,
        //   sameSite: "lax",
        // });
        return res.status(200).send({
            token: token
        });
    }
    catch (err) {
        return res.status(500).send({ message: "Internal server error" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).send({ message: "Logged out successfully" });
};
exports.logout = logout;
const getUser = async (req, res) => {
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
    }
    catch (err) {
        return res.status(500).send({ message: "Cannot fetch user details" });
    }
};
exports.getUser = getUser;
