const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")){
        res.send("Fuddu token")
    }

    token = token.split(" ")[1]
    const {id} = jwt.verify(token, "secret")
    req.user = id;
    next()
}

module.exports = auth