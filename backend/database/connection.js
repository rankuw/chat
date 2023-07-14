const {connect, set} = require("mongoose")
const colors = require("colors")

const connectDb = async () => {
    try{
        const conn = connect("mongodb://localhost:27017/uChat")
        set("debug", true)
        console.log("Mongo connected".underline.green)
    }catch(err){
        console.log(err.msg.red.bold)
    }
}

module.exports = connectDb