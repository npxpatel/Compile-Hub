import express, { Request, Response } from "express"
import cors from "cors" 
import { compilerRouter } from "./routes/compilerRouter"
export const app = express()

app.use(express.json())
app.use(cors())

app.use("/compiler",compilerRouter)


app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
