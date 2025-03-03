import express from 'express';
import { deleteCode, editCode, getMyCodes, loadCode, saveCode } from '../controllers/compilerController';
import { verifyTokenAnonymous } from '../middleware/AnonymToken';
import { verifyToken } from '../middleware/token';

export const compilerRouter = express.Router();


compilerRouter.post("/save", verifyToken, saveCode);
compilerRouter.post("/load", loadCode);
compilerRouter.delete("/delete/:id", verifyToken, deleteCode);
compilerRouter.put("/edit/:id", verifyToken, editCode);
compilerRouter.get("/get-my-codes", verifyToken, getMyCodes);

