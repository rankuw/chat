const jwt = require('jsonwebtoken')

const createToken = (id) => {
    console.log(id)
    return jwt.sign({id}, "secret", {
        expiresIn: "10d"
    })
}

module.exports = {
    createToken
}