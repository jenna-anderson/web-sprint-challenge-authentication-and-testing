const Users = require('./auth-model')

function checkPayloadBody(req, res, next) {
    const { username, password } = req.body
    if(username && password && typeof password === "string") {
        next()
    } else {
        next({
            status: 422,
            message: "username and password required"
        })
    }
}

function checkUsernameExists(req, res, next) {
    const { username } = req.body
    // complete later
    next()
}

module.exports = {
    checkPayloadBody,
    checkUsernameExists
}