const asyncHandler = require("express-async-handler")
const Chat = require("../models/Chat.model")
const User = require("../models/User.model")
const accessChat = asyncHandler(
    async (req, res) => {
        try{
            const userId = req.user.id;
            const targetUserId = req.body.userId;
            if(!targetUserId){
                throw new Error("Target user not found")
            }
            const criteria = {
                isGroupChat: false,
                $and: [
                    {userIds: { $elemMatch: { $eq: userId } }},
                    {userIds: { $elemMatch: { $eq: targetUserId}}}
                ]
            }

            let chat = await Chat.findOne(criteria, {lean: true}).populate("userIds", "-password").populate("lastMessage")
            if(!chat){
                const newChat = await Chat.create({
                    isGroupChat: false,
                    userIds: [userId, targetUserId],
                    name: "sender"
                })

                chat = await Chat.findOne({_id: newChat.id}, {lean: true}).populate("userIds", "-password").populate("lastMessage")
            }

            chat = await User.populate(chat, {
                path: "lastMessage.sender",
                select: "name pic email"
            })
            res.send(chat)
        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }
)

const fetchChats = asyncHandler(
    async(req, res) => {
        try{
            const userId = req.user.id;
            const chats = await Chat.find({
                userIds: {$elemMatch: {$eq: userId}}
            }).populate("userIds", "-password").populate("groupAdmin", "-password").populate("lastMessage").sort({createAt: -1})

            res.send(chats)
        }catch(err){
            console.log(err.message);
            throw new Error(err.message)
        }
        
    }
)

const createGroupChats = asyncHandler(
    async(req, res) => {
        try{
            const userId = req.user.id;
            const usersToAdd = JSON.parse(req.body.users);
            console.log(usersToAdd)
            if (usersToAdd.length < 2){
                throw new Error("Minimum 2 user are needed")
            }
            usersToAdd.push(userId)
            const groupName = req.body.groupName
            const groupChat = await Chat.create({
                name: groupName,
                userIds: usersToAdd,
                groupAdmin: userId,
                isGroupChat: true
            })
            const fullChat = await Chat.findOne({_id: groupChat.id}).populate("userIds", "-password").populate("groupAdmin", "-password");
            res.send(fullChat);
        }catch(err){
            console.log(err);
            throw new Error(err.message);
        }
    }
)

const renameGroup = asyncHandler(
    async(req, res) => {
        try{
            const {newName, chatId} = req.body;

            const newChat = await Chat.findOneAndUpdate({_id: chatId}, {name: newName}, {new: true}).populate("userIds", "-password").populate("groupAdmin", "-password");

            if(!newChat){
                throw new Error("Chat id not found")
            }
            res.send(newChat)
        }catch(err){
            console.log(err.message);
            throw new Error(err.message)
        }
    }
)

const removeFromGroup = asyncHandler(
    async (req, res) => {
        try{
            const {userId, chatId} = req.body;
            const newChat = await Chat.findOneAndUpdate({_id: chatId}, {$pull: {userIds: userId}}, {new: true}).populate("userIds", "-password").populate("groupAdmin", "-password");
            if(!newChat){
                throw new Error("Chat id not found")
            }
            res.send(newChat)
        }catch(err){
            console.log(err.message);
            throw new Error(err.message)
        }
    }
)

const addToGroup = asyncHandler(
    async (req, res) => {
        try{
            const {userId, chatId} = req.body;
            const newChat = await Chat.findOneAndUpdate({_id: chatId}, {$push: {userIds: userId}}, {new: true}).populate("userIds", "-password").populate("groupAdmin", "-password");
            if(!newChat){
                throw new Error("Chat id not found")
            }
            res.send(newChat)
        }catch(err){
            console.log(err.message);
            throw new Error(err.message)
        }
    }
)

module.exports = {accessChat, fetchChats, createGroupChats, renameGroup, removeFromGroup, addToGroup}