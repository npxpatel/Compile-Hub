import express, { Request, Response } from "express"
import cors from "cors" 
import { compilerRouter } from "./routes/compilerRouter"
import cookieParser from "cookie-parser"
import { userRouter } from "./routes/userRouter"

import dotenv from 'dotenv';

export const app = express()

dotenv.config();

app.use(express.json())
app.use(cors({
  origin: 'https://wd-compiler-frontend.vercel.app', 
  credentials: true,
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use("/compiler",compilerRouter)
app.use("/user",userRouter);




app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

export default app;