const express = require("express");

const chatRoute = express.Router();
const { accessChat, fetchChats, createGroupChats, renameGroup, removeFromGroup, addToGroup } = require("../controller/chat.controller");
const auth = require("../middleware/authMiddleware")

// return the chat between two people or create a new one if not present from before.
chatRoute.post("/", auth, accessChat)
chatRoute.get("/", auth, fetchChats)
chatRoute.post("/group", auth, createGroupChats)
chatRoute.patch("/group", auth, renameGroup)
chatRoute.patch("/group/remove", auth, removeFromGroup)
chatRoute.patch("/group/add", auth, addToGroup)
module.exports = chatRoute