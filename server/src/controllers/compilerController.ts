import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

interface fullCodeType {
  html: string;
  css: string;
  javascript: string;
}

async function addCode(fullCode: fullCodeType) {
  const code = await prisma.code.create({
    data: {
      html: fullCode.html,
      css: fullCode.css,
      javascript: fullCode.javascript,
    },
  });
  return code;
}

export const saveCode = async (req: Request, res: Response) => {
  const { html, css, javascript } = req.body;
  const fullCode = { html, css, javascript };
  console.log(fullCode);
  try {
    const newCode = await addCode(fullCode);
    const id = newCode.id;
    res
      .status(200)
      .send({ url: newCode.id, status: "Code saved successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Failed to save code" });
  }
};

export const loadCode = async (req: Request, res: Response) => {
  const { urlId } = req.body;
  try {
    const code = await prisma.code.findUnique({
      where: {
        id: urlId,
      },
    });

    if (!code) {
      return res.status(404).send({ msg: "Code not found" });
    }
    res.status(200).send({ code });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Failed to load code" });
  }
};
