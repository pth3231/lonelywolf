const jwt = require('jsonwebtoken')
const config = require('../config.json')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = req.body.token
    console.log(`[authenticateToken.js]: ${token}`)

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, config.secret, (err) => {
        if (err) {
            console.log(`[authenticateToken.js]: ${err}`)
            return res.sendStatus(403)
        }
        next()
    })
}

module.exports = authenticateToken