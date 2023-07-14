const express = require("express")
const userRoute = express.Router()

const { signUp, logIn, fetchUsers } = require("../controller/user.controller")
const auth = require("../middleware/authMiddleware")

userRoute.post("/signUp", signUp)
userRoute.post("/login", logIn)
userRoute.get("/", auth, fetchUsers)

module.exports = userRoute