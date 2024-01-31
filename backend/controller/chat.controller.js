const Chat =  require("../models/chat.model")

const accessChat = async (req, res) => {
    try{
        const { user } = req.body;

        const userId = req.user;

        let chat = await Chat.findOne({
            isGroupChat: false,
            $and: [
                {users: {$elemMatch: { $eq: user}}},
                {users: {$elemMatch: { $eq: userId}}}
            ]
        }).populate("users").populate("latestMessage").populate("latestMessage.sender")

        if (chat){
            res.send(chat)
            return
        }
        chat = await Chat.create({
            isGroupChat: false,
            users: [user, userId],
            chatName: "users"
        })
        chat = await Chat.findOne({_id: chat.id}).populate("users")
        console.log(chat)
        res.send(chat)
    }catch(err){
        console.log(err)
        return err;
    }
}

const fetchChats = async(req, res) => {
    const user = req.user;
    const chats = await Chat.find({
        users: {$elemMatch: {$eq: user}}
    })
    res.send(chats)
}

const createGroupChat = async (req, res) => {
    const {users, chatName} = req.body
    const user = req.user

    users.push(user)

    const groupChat = await Chat.create({
        isGroupChat: true,
        users,
        chatName,
        groupAdmin: user
    })

    const group = await Chat.findOne({_id: groupChat.id}).populate("users").populate("groupAdmin")

    res.send(group)
}

const renameGroup = async (req, res) => {
    const { chatId, newName } = req.body;
    const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: newName
        },
        {
            new: true
        }
    ).populate("users").populate("groupAdmin")

    res.send(chat)
}

const addToGroup = async (req, res) => {
    const {chatId, userId} = req.body;
    const chat = await Chat.findByIdAndUpdate(
        chatId,
        {$push: {users: userId}},
        { returnOriginal: false }
    ).populate("users").populate("groupAdmin")

    res.send(chat)
}

const removeFromGroup = async(req, res) => {
    const {chatId, userId} = req.body;
    const chat = await Chat.findByIdAndUpdate(
        chatId,
        {$pull: {users: userId}},
        { returnOriginal: false }
    ).populate("users").populate("groupAdmin")

    res.send(chat)
}

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }