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
        const input_username = req.body.user
        const input_password = req.body.pass
        const input_nickname = req.body.nickname

        let conn
        try {
            // Wait for the connection to be established
            conn = await pool.getConnection()

            // Query rows with the matching username and password
            await conn.query("INSERT INTO auth_info SET username=?, pass=?, acc_name=?", [input_username, input_password, input_nickname])
            res.json({status: true})
        } catch (err) {
            console.log(err)
            res.json({status: false})
        } finally {
            // End connection session if the conn is still running
            if (conn) return conn.end()
        }
    })

module.exports = router