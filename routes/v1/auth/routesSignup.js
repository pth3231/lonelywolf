const express = require('express')
const mariadb = require('mariadb')
let router = express.Router()

// Create a Pool object to handling the connection establishment
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'lonelywolf',
    password: 'lonelywolf',
    database: 'lonelywolf_db',
    connectionLimit: 15
})

router.route('/signup')
    .get((req, res) => {
        res.status(200).json({ message: "This is sign up GET request!" })
    })
    .post(async (req, res) => {
        const input_username = req.body.data.user
        const input_password = req.body.data.pass
    })

module.exports = router