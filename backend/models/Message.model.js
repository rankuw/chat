const mongoose = require("mongoose")

const messageSchema = ({
    chat: {type: mongoose.SchemaTypes.ObjectId, ref: "Chat"},
    sender: {type: mongoose.SchemaTypes.ObjectId, ref: "User"},
    content: {type: String},
    readBy: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message