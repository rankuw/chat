const { Router } = require("express")
const auth = require("../middleware/auth")
const messageRoute = Router()

const { sendMessage, getAllMessages} = require("../controller/message.route")

messageRoute.get("/:chatId", auth, getAllMessages)
messageRoute.post("/", auth, sendMessage)

module.exports = messageRoute