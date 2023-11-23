const express = require('express')
const mariadb = require('mariadb')
let router = express.Router()
const config = require('../config.json')
const jwt = require('jsonwebtoken')

// Create a Pool object to handling the connection establishment
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'lonelywolf',
    password: 'lonelywolf',
    database: 'lonelywolf_db',
    connectionLimit: 15
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = req.body.token
    console.log(token)

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, config.secret, (err) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        next()
    })
}

router.post("/getstatus", authenticateToken, async (req, res) => {
    let conn
    try {
        // Wait for the connection to be established
        conn = await pool.getConnection()

        // Query status of character
        const rows = await conn.query("SELECT acc_name, strength, defense, agility, stamina, coin FROM auth_info WHERE (username = ?)", [req.body.username])

        // Send back an object
        res.status(200).json({ status: true, data: rows[0] })
    } catch (err) {
        console.log(err)
    } finally {
        // End connection session if the conn is still running
        if (conn) return conn.end()
    }

})

module.exports = router