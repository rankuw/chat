const User = require("../models/user.model")

const signUp = async (payload) => {
    try{
        const user = await User.create(payload)
        return {name: user.name, id: user.id}
    }catch(err){
        console.log(err)
        return err
    }
}

const logIn = async (payload) => {
    try{
        const user = await User.findOne(payload).lean()
        console.log(user)
        console.log("++++++++++")
        return user
    }catch(err){
        console.log(err)
        return err
    }
}

const getUsers = async (req, res) => {
    const {name} = req.query;
    const users = await User.find({
        name: {$regex: name, $options: "i"}
    })
    res.send(users)
}

module.exports = {signUp, logIn, getUsers}