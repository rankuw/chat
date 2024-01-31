const express = require("express")
const cors = require('cors')

const app = express()
const userRoute = require("./routes/user.route")
const mongoConnection = require("./database/connection")
const chatRouter = require("./routes/chat.route")

mongoConnection()
app.use(cors())
app.use(express.json())
app.use("/user", userRoute)
app.use("/chat", chatRouter)

app.listen(4000, () => {
    console.log("server on 4000")
})