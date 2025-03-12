"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyCodes = exports.editCode = exports.deleteCode = exports.loadCode = exports.saveCode = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addCode(fullCode, userId, ownerNm) {
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
async function connectUserCode(newCodeId, ownerId) {
    await prisma.user.update({
        where: { id: ownerId },
        data: { savedCodes: { connect: { id: newCodeId } } },
    });
}
const saveCode = async (req, res) => {
    const { html, css, javascript } = req.body;
    const fullCode = { html, css, javascript };
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
    }
    else {
        return res.status(401).send({ msg: "Unauthorized" });
    }
    try {
        const newCode = await addCode(fullCode, ownerId, ownerNm);
        await connectUserCode(newCode.id, ownerId);
        return res
            .status(201)
            .send({ url: newCode.id, msg: "Code saved successfully" });
    }
    catch (error) {
        console.error("Error saving code:", error);
        return res.status(500).send({ msg: "Failed to save code" });
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    const { urlId } = req.body;
    try {
        const existingCode = await prisma.code.findUnique({ where: { id: urlId } });
        if (!existingCode) {
            return res.status(404).send({ msg: "Code not found" });
        }
        return res.status(200).send({ code: existingCode });
    }
    catch (error) {
        console.error("Error loading code:", error);
        return res.status(500).send({ msg: "Failed to load code" });
    }
};
exports.loadCode = loadCode;
const deleteCode = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error deleting code:", error);
        return res.status(500).send({ msg: "Failed to delete code" });
    }
};
exports.deleteCode = deleteCode;
const editCode = async (req, res) => {
    const { html, css, javascript, urlId } = req.body;
    const userId = req._id;
    const codeID = parseInt(urlId);
    try {
        const existingCode = await prisma.code.findUnique({ where: { id: codeID } });
        if (!existingCode) {
            return res.status(404).send({ msg: "Code not found" });
        }
        if (existingCode.userId !== userId) {
            return res.status(403).send({ msg: "Unauthorized" });
        }
        await prisma.code.update({
            where: { id: codeID },
            data: { html, css, javascript },
        });
        return res.status(200).send({ msg: "Code updated successfully", url: codeID });
    }
    catch (error) {
        console.error("Error updating code:", error);
        return res.status(500).send({ msg: "Failed to update code" });
    }
};
exports.editCode = editCode;
const getMyCodes = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error getting saved codes:", error);
        return res.status(500).send({ msg: "Failed to get saved codes" });
    }
};
exports.getMyCodes = getMyCodes;
