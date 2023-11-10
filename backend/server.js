const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mariadb = require('mariadb')
//const multer = require('multer')

//const upload = multer() 
const app = express()
const port = 6767

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'lonelywolf',
    password: 'lonelywolf',
    database: "lonelywolf_db",
    connectionLimit: 5
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.get('/api/v1', (req, res) => {
    res.send("This is our API!")
})

app.route('/api/v1/auth')
    .get((req, res) => {
        console.log("Got signin route!")
        res.send("Okay, GOT!").status(200)
    })
    .post((req, res) => {
        const req_data = req.body
        console.log("Req's data ", req_data)

        pool.getConnection()
            .then(conn => {
                conn.query("SELECT * FROM `auth_info`;")
                    .then((rows) => {
                        console.log(rows)
                        if (rows[0].username === req_data.data.user && rows[0].pass === req_data.data.pass) {
                            console.log("Thong tin ok")
                            res.json({status: "Okay"})
                        } else {
                            console.log("Co gi do sai sai")
                            res.json({status: "Try again"})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        conn.end()
                    })
            })
            .catch(err => { })

    })

app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})