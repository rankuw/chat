const express = require("express")
const cors = require('cors')

const app = express()
const userRoute = require("./routes/user.route")
const mongoConnection = require("./database/connection")
const chatRouter = require("./routes/chat.route")
const messageRoute = require("./routes/message.route")
const socket = require("socket.io")

mongoConnection()
app.use(cors())
app.use(express.json())
app.use("/user", userRoute)
app.use("/chat", chatRouter)
app.use("/message", messageRoute)

const server = app.listen(4000, () => {
    console.log("server on 4000")
})

const io = socket(server, {
    pingTimeOut: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {

    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room)
        console.log("User joined room: ", room)
    })

    socket.on("new message", (newMessage) => {

        const chat = newMessage.chatId

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
        if (user._id == newMessage.sender._id) return;

        socket.in(user._id).emit("message received", newMessage);
        });
    })

    socket.on("typing", (room) => {  socket.in(room).emit("typing")})
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))
})