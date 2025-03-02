"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compilerRouter_1 = require("./routes/compilerRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRouter_1 = require("./routes/userRouter");
const dotenv_1 = __importDefault(require("dotenv"));
exports.app = (0, express_1.default)();
dotenv_1.default.config();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: 'https://wd-compiler-frontend.vercel.app',
    credentials: true,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.get('/', (req, res) => {
    res.send('Hello, world!');
});
exports.app.use("/compiler", compilerRouter_1.compilerRouter);
exports.app.use("/user", userRouter_1.userRouter);
exports.app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
exports.default = exports.app;
