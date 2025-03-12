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
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const server = (0, http_1.createServer)(exports.app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            "https://wd-compiler-frontend.vercel.app",
            "http://localhost:5173",
        ],
        credentials: true,
    },
});
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: [
        "https://wd-compiler-frontend.vercel.app",
        "http://localhost:5173",
    ],
    credentials: true,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.get("/", (req, res) => {
    res.send("Hello, world!");
});
exports.app.use("/compiler", compilerRouter_1.compilerRouter);
exports.app.use("/user", userRouter_1.userRouter);
const documents = {};
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join-document", async (docId) => {
        socket.join(docId);
        if (documents[docId]) {
            socket.emit("load-document", documents[docId]);
        }
        else {
            try {
                // Fetch latest saved code from backend API
                const response = await axios_1.default.post("http://localhost:3000/compiler/load", {
                    urlId: docId,
                });
                if (response.data.code) {
                    documents[docId] = {
                        html: response.data.code.html || "",
                        css: response.data.code.css || "",
                        javascript: response.data.code.javascript || "",
                    };
                    socket.emit("load-document", documents[docId]);
                }
            }
            catch (error) {
                console.error("Error loading code:", error);
                socket.emit("error", "Failed to load document");
            }
        }
    });
    socket.on("send-changes", ({ docId, content, language }) => {
        if (!documents[docId]) {
            documents[docId] = { html: "", css: "", javascript: "" };
        }
        // Update only the modified language
        documents[docId][language] = content;
        // Broadcast changes only for the specific language
        socket.to(docId).emit("receive-changes", { language, content });
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
exports.default = exports.app;
