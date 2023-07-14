const express = require("express")
const data = require("./data")
const app = express()
const connectDb = require("./database/connection")
const userRoute = require("./routes/user.route")
const chatRoute = require("./routes/chat.route")
const errorHandler = require("./middleware/errorHandler")
const notFound = require("./middleware/notFound")
connectDb();

app.use(express.json())
app.use("/user", userRoute);
app.use("/chat", chatRoute)

app.use(notFound)
app.use(errorHandler);

app.listen(4000, () => {
    console.log("Server is listening on ", 4000)
})
