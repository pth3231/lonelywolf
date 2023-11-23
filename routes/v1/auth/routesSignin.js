const express = require('express')
const mariadb = require('mariadb')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const config = require('../../config.json')
let router = express.Router()

dotenv.config()

// Create a Pool object to handling the connection establishment
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'lonelywolf',
    password: 'lonelywolf',
    database: 'lonelywolf_db',
    connectionLimit: 15
})

// This is the route for sign in, use to check if there is any matched result in the database
// If it does, the server will send a cookie and init a new session to validate later 
router.route('/signin')
    .get((req, res) => {
        console.log("Got signin route!")
        res.send("Okay, GOT!").status(200)
    })
    .post(async (req, res) => {
        const username = req.body.data.user
        const password = req.body.data.pass
        console.log("Req data", req.body)

        let conn
        try {
            // Wait for the connection to be established
            conn = await pool.getConnection()

            // Query rows with the matching username and password
            const rows = await conn.query("SELECT acc_name, strength, defense, agility, stamina, coin FROM auth_info WHERE (username = ?) AND (pass = ?)", [username, password])
            console.log(rows)

            const token = jwt.sign({ username: req.body.data.user }, config.secret, {expiresIn: '600s'}) 
            // If it does exist
            if (rows.length == 1) {
                // Send a successful response for frontend
                res.cookie("token", token, {
                    maxAge: 3600*1000,
                    httpOnly: true
                })
                res.cookie("username", username, {
                    maxAge: 3600*1000,
                    httpOnly: true
                })

                res.status(200).json({
                    status: true,
                    token: token
                })

                console.log("Signed in!")
            } else if (rows.length == 0) {
                console.log("There is no such of this username/password that matched with out database")

                // Send a no existing response
                res.status(200).json({ status: false })
            }
        } catch (err) {
            console.log(err)
        } finally {
            // End connection session if the conn is still running
            if (conn) return conn.end()
        }
    })

module.exports = router