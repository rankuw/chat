const { Router } = require("express")
const chatRouter = Router()
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controller/chat.controller")
const auth  = require("../middleware/auth")

chatRouter.post("/access", auth, accessChat)
chatRouter.get("/", auth, fetchChats)
chatRouter.post("/group", auth, createGroupChat)
chatRouter.patch("/update", auth, renameGroup)
chatRouter.patch("/group/add", auth, addToGroup)
chatRouter.patch("/group/remove", auth, removeFromGroup)

module.exports = chatRouter;