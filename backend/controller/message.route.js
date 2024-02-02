const Chat = require("../models/chat.model")
const Message = require("../models/message.model")
const User = require("../models/user.model")

const getAllMessages = async (req, res) => {
    try{
        const messages = await Message.find({chatId: req.params.chatId}).populate("sender").populate("chatId")
        res.send(messages)

    }catch(err){
        console.log(err)
        res.send("OOps")
    }
} 

const sendMessage = async (req, res) => {
    try{
        const dataToSave = {
            chatId : req.body.chatId,
            content: req.body.content,
            sender: req.user
        }
        console.log(dataToSave)
        let message = await Message.create(dataToSave)

        message = await message.populate("sender")
        message = await message.populate("chatId")

        message = await User.populate(message, {path: "chatId.users"})
        let chat = await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message})
        res.send(message)

    }catch(err){
        console.log(err)
        res.send("OOps")
    }
}

module.exports = { getAllMessages, sendMessage}