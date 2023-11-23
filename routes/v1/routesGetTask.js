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

// Get list of tasks
function randomBetween(array) {
    const randomizedIndex = Math.floor(Math.random() * (array.length))
    return array[randomizedIndex]
}

router.route('/gettask')
    .get(async (req, res) => {
        let conn
        try {
            // Wait for the connection to be established
            conn = await pool.getConnection()

            const rows = await conn.query("SELECT title, `desc`, proc FROM tasks_detail WHERE (username = ?);", [session.username])
            console.log(rows)
            res.status(200).json(rows)
        } catch (e) {
            console.error("Failed during getting task!", e)
            res.send(500)
        }

        let randomedTask = []
        for (let times = 0; times <= 3; times++) {
            randomedTask.push(randomBetween(Task.daily_step_tasks))
        }
        console.log(randomedTask)
    })

module.exports = router