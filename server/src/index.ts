import express, { Request, Response } from "express";
import cors from "cors";
import { compilerRouter } from "./routes/compilerRouter";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRouter";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://wd-compiler-frontend.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://wd-compiler-frontend.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);


const documents: Record<
  string,
  { html: string; css: string; javascript: string }
> = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", async (docId: string) => {
    socket.join(docId);

    if (documents[docId]) {
      socket.emit("load-document", documents[docId]);
    } else {
      try {
        // Fetch latest saved code from backend API
        const response = await axios.post("http://localhost:3000/compiler/load", {
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
      } catch (error) {
        console.error("Error loading code:", error);
        socket.emit("error", "Failed to load document");
      }
    }
  });

  socket.on("send-changes", ({ docId, content, language } :
          { docId: string; content: string; language: "html" | "css" | "javascript" }) => {
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
})

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
