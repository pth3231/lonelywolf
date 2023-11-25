const express = require('express')
const mariadb = require('mariadb')
const jwt = require('jsonwebtoken')
const config = require('../config.json')
let authenticateToken = require('../modules/authenticateToken')

let router = express.Router()

// Create a Pool object to handling the connection establishment
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'lonelywolf',
    password: 'lonelywolf',
    database: 'lonelywolf_db',
    connectionLimit: 15
})

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