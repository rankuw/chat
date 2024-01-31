const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token)
    if (!token || !token.startsWith("Bearer")){
        res.send("Fuddu token")
    }

    token = token.split(" ")[1]
    console.log(token)
    const {id} = jwt.verify(token, "secret")
    req.user = id;
    next()
}

module.exports = auth