const { connect, set} = require("mongoose")

const mongoConnection = async () => {
    try{
        const connection = await connect("mongodb://localhost:27017/uChat")

        console.log("mongo connected")
    }catch(err){
        console.log(err)
    }
}

module.exports = mongoConnection