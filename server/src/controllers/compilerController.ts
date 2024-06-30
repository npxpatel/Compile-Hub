import { PrismaClient } from "@prisma/client";
import { Auth } from "../middleware/token";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface fullCodeType {
  html: string;
  css: string;
  javascript: string;
}

async function addCode(
  fullCode: fullCodeType,
  userId: number,
  ownerName: string
) {
  const code = await prisma.code.create({
    data: {
      html: fullCode.html,
      css: fullCode.css,
      javascript: fullCode.javascript,
      userId: userId,
      ownerNm: ownerName,
    },
  });
  return code;
}

async function updateCode(newCodeId: number, ownerId: number) {
  await prisma.user.update({
    where: {
      id: ownerId,
    },
    data: {
      savedCodes: {
        connect: {
          id: newCodeId,
        },
      },
    },
  });
}

export const saveCode = async (req: Auth, res: Response) => {
  const { html, css, javascript } = req.body;
  const fullCode = { html, css, javascript };

  let user = undefined;
  let ownerId = undefined;
  let ownerName = undefined;
  let isAuthenticated = false;

  if (req._id) {
    user = await prisma.user.findUnique({
      where: {
        id: req._id,
      },
    });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    ownerId = user.id;
    ownerName = user?.username;
    isAuthenticated = true;
  }

  if (!html && !css && !javascript) {
    return res.status(400).send({ msg: "Code is empty" });
  }

  try {
    const newCode = await addCode(fullCode, ownerId!, ownerName!);
    if (isAuthenticated && user) {
      await updateCode(newCode.id, ownerId!);
    }
    return res
      .status(200)
      .send({ url: newCode.id, msg: "Code saved successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Failed to save code" });
  }
};

export const loadCode = async (req: Auth, res: Response) => {
  const { urlId } = req.body;
  const userId = req._id;
  let isOwner = false;

  try {
    const existingCode = await prisma.code.findUnique({
      where: {
        id: urlId,
      },
    });

    if (!existingCode) {
      return res.status(404).send({ msg: "Code not found" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user?.username === existingCode.ownerNm) {
      isOwner = true;
    }

    const { html, css, javascript } = existingCode;

    return res
      .status(200)
      .send({ fullCode: { html, css, javascript }, isOwner });
  } catch (err) {
    return res.status(500).send({ msg: "Failed to load code" });
  }
};

export const deleteCode = async (req: Auth, res: Response) => {
  const { urlId } = req.body;
  const userId = req._id;

  try {
    const existingCode = await prisma.code.findUnique({
      where: {
        id: urlId,
      },
    });

    if (!existingCode) {
      return res.status(404).send({ msg: "Code not found" });
    }

    if (existingCode.userId !== userId) {
      return res.status(403).send({ msg: "Unauthorized" });
    }

    await prisma.code.delete({
      where: {
        id: urlId,
      },
    });

    return res.status(200).send({ msg: "Code deleted successfully" });
  } catch (err) {
    return res.status(500).send({ msg: "Failed to delete code" });
  }
};

export const editCode = async (req: Auth, res: Response) => {
  const { html, css, javascript, urlId } = req.body;
  const userId = req._id;

  try {
    const existingCode = await prisma.code.findUnique({
      where: {
        id: urlId,
      },
    });

    if (!existingCode) {
      return res.status(404).send({ msg: "Code not found" });
    }

    if (existingCode.userId !== userId) {
      return res.status(403).send({ msg: "Unauthorized" });
    }

    await prisma.code.update({
      where: {
        id: urlId,
      },
      data: {
        html,
        css,
        javascript,
      },
    });

    return res.status(200).send({ msg: "Code updated successfully" });
  } catch (err) {
    return res.status(500).send({ msg: "Failed to update code" });
  }
};

export const getAllCodes = async (req: Auth, res: Response) => {
  const userId = req._id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        savedCodes: true,
      },
    });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    return res.status(200).send({ savedCodes: user.savedCodes });
  } catch (err) {
    return res.status(500).send({ msg: "Failed to get saved codes" });
  }
};
