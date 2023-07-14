const jwt = require("jsonwebtoken")
const User = require("../models/User.model")
const asyncHandler = require("express-async-handler")
const auth = asyncHandler(
    async (req, res, next) => {
        try{
            if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
                throw new Error("Invalid token")
            }
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "shhhhhhhh");
            const userId = decoded.id
            const user = await User.findOne({_id: userId})
            if (!user){
                throw new Error("Invalid token")
            }
            req.user = user
            next()
    
        }catch(err){
            console.log(err.message)
            throw new Error(err.message)
        }
    }
)

module.exports = auth