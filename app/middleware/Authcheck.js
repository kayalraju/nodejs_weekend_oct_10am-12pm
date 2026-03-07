
const jwt = require("jsonwebtoken")
const AuthCheck = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken,  process.env.JWT_SECRECT || "1234", (err, data) => {
            req.user = data
            next()
        })
    } else {
        next()
    }
}

module.exports = AuthCheck;