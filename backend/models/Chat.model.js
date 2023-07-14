const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    name : {type: String, required: true},
    isGroupChat: {type: Boolean, default: false},
    userIds: [
        {type: mongoose.SchemaTypes.ObjectId, ref: "User"}
    ],
    lastMessage: {type: mongoose.SchemaTypes.ObjectId, ref: "Message"},
    groupAdmin: {type: mongoose.SchemaTypes.ObjectId, ref: "User"}
}, {
    timeStamps: true
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat