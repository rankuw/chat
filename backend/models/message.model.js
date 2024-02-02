const { Schema, model} = require("mongoose")


const messageSchema = Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: "string"
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }
})

const Message = model("Message", messageSchema)

module.exports = Message