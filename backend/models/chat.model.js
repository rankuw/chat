const { Schema, model } = require("mongoose");

const chatSchema = Schema({
    chatName: {
        type: "string"
    },
    isGroupChat: {
        type: "boolean"
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    }
})

const Chat = model("Chat", chatSchema)

module.exports = Chat;