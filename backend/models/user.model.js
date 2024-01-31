const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: {
        type: "string", require: true
    },
    email: {
        type: "string", require: true
    },
    password: {
        type: "string", require: true
    }
})

const User = model("User", userSchema)

module.exports = User