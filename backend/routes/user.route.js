const express = require("express")
const userRoute = express.Router()

const { signUp, logIn, getUsers } = require("../controller/user.controller")
const { createToken } = require("../utils/helper")

userRoute.post("/signUp", async (req, res) => {
    const payload = req.body
    const user = await signUp(payload)
    console.log(user)
    res.send({...user, token: createToken(user._id)})
})

userRoute.post("/login", async(req, res) => {
    const payload = req.body
    const user = await logIn(payload)
    console.log("+++++++++")
    console.log(user)
    res.send({...user, token: createToken(user._id)})

})

userRoute.get("/", getUsers)

module.exports = userRoute