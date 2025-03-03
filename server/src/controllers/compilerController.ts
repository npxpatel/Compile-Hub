import { Auth } from "../middleware/token";
import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();

interface FullCodeType {
  html: string;
  css: string;
  javascript: string;
}

async function addCode(
  fullCode: FullCodeType,
  userId: number,
  ownerNm: string
) {
  return await prisma.code.create({
    data: {
      html: fullCode.html,
      css: fullCode.css,
      javascript: fullCode.javascript,
      ownerNm: ownerNm,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

async function updateCode(newCodeId: number, ownerId: number) {
  await prisma.user.update({
    where: { id: ownerId },
    data: { savedCodes: { connect: { id: newCodeId } } },
  });
}

export const saveCode = async (req: Auth, res: Response) => {
  const { html, css, javascript } = req.body;
  const fullCode: FullCodeType = { html, css, javascript };

  if (!html && !css && !javascript) {
    return res.status(400).send({ msg: "Code is empty" });
  }

  console.log(req._id + " from saveCode");

  let ownerId;
  let ownerNm;
  if (req._id) {
    const user = await prisma.user.findUnique({ where: { id: req._id } });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    ownerId = user.id;
    ownerNm = user.username; // Get the owner's username
  } else {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  try {
    const newCode = await addCode(fullCode, ownerId, ownerNm);
    await updateCode(newCode.id, ownerId);
    return res
      .status(201)
      .send({ url: newCode.id, msg: "Code saved successfully" });
  } catch (error) {
    console.error("Error saving code:", error);
    return res.status(500).send({ msg: "Failed to save code" });
  }
};

export const loadCode = async (req: Auth, res: Response) => {
  const { urlId } = req.body;
 

  try {
    const existingCode = await prisma.code.findUnique({ where: { id: urlId } });
    if (!existingCode) {
      return res.status(404).send({ msg: "Code not found" });
    }

    return res.status(200).send({ code: existingCode });
  } catch (error) {
    console.error("Error loading code:", error);
    return res.status(500).send({ msg: "Failed to load code" });
  }
};

export const deleteCode = async (req: Auth, res: Response) => {
  const { urlId } = req.body;
  const userId = req._id;

  try {
    const existingCode = await prisma.code.findUnique({ where: { id: urlId } });
    if (!existingCode) {
      return res.status(404).send({ msg: "Code not found" });
    }
    if (existingCode.userId !== userId) {
      return res.status(403).send({ msg: "Unauthorized" });
    }

    await prisma.code.delete({ where: { id: urlId } });
    return res.status(200).send({ msg: "Code deleted successfully" });
  } catch (error) {
    console.error("Error deleting code:", error);
    return res.status(500).send({ msg: "Failed to delete code" });
  }
};

export const editCode = async (req: Auth, res: Response) => {
  const { html, css, javascript, urlId } = req.body;
  const userId = req._id;

  try {
    const existingCode = await prisma.code.findUnique({ where: { id: urlId } });
    if (!existingCode) {
      return res.status(404).send({ msg: "Code not found" });
    }
    if (existingCode.userId !== userId) {
      return res.status(403).send({ msg: "Unauthorized" });
    }

    await prisma.code.update({
      where: { id: urlId },
      data: { html, css, javascript },
    });
    return res.status(200).send({ msg: "Code updated successfully" });
  } catch (error) {
    console.error("Error updating code:", error);
    return res.status(500).send({ msg: "Failed to update code" });
  }
};

export const getMyCodes = async (req: Auth, res: Response) => {
  const userId = req._id;
  if (!userId) {
    return res.status(400).send({ msg: "User ID is missing" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { savedCodes: true },
    });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    return res.status(200).send({ savedCodes: user.savedCodes });
  } catch (error) {
    console.error("Error getting saved codes:", error);
    return res.status(500).send({ msg: "Failed to get saved codes" });
  }
};
