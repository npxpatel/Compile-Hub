import express, { Request, Response } from "express"
import cors from "cors" 
import { compilerRouter } from "./routes/compilerRouter"
import cookieParser from "cookie-parser"
import { userRouter } from "./routes/userRouter"
export const app = express()

app.use(express.json())
app.use(cors({
  origin: 'frontend/url/vercel.app', 
  
}));
app.use(cookieParser());

app.use("/compiler",compilerRouter)
app.use("/user",userRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
