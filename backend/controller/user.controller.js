const User = require("../models/User.model")
const generateToken = require("../utils/token")
const asyncHandler = require("express-async-handler")

const signUp = asyncHandler(
    async (req, res) => {
        const {name, email, password } = req.body;
        if(!name || !email || !password){
            throw new Error("Not all values are passed")
        }
        let user = await User.findOne({email});
        if(user){
            throw new Error("User exists from before")
        }
        user = await User.create({name, email, password})
        res.send({
            name,
            email,
            token : generateToken(user._id)
        })
    }
)

const logIn = asyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error("Not all values passed")
        }
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            throw new Error("User does not exists")
        }
        console.log(user.password, password)
        if(user.password != password){
            throw new Error("Incorrect password")
        }
        res.send({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
)

const fetchUsers = asyncHandler(
    async (req, res) => {
        try{
            const keyword = req.query.search
            const user = req.user
            console.log(user)
            const criteria = {_id: {$ne: user.id}}
            if(keyword){
                criteria["$or"] = {
                    $or: [
                        {name: {$regex: keyword, $options: "i"}}
                    ]
                }
            }
            const projection = {password: 0}
            const users = await User.find(criteria, projection, {lean: true})
            res.send(users)
        }catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }
)
module.exports = {signUp, logIn, fetchUsers}