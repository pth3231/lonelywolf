const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mariadb = require('mariadb')
const config = require('./config.json')
//const multer = require('multer')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

//const upload = multer() 
const app = express()
const port = 6767

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'lonelywolf',
    password: 'lonelywolf',
    database: 'lonelywolf_db',
    connectionLimit: 15
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(cookieParser())
app.use(expressSession({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 120000} // maxage in msec
}))

let session

app.get('/api/v1', (req, res) => {
    res.send("This is our API!")
})

app.route('/api/v1/auth/signin')
    .get((req, res) => {
        console.log("Got signin route!")
        res.send("Okay, GOT!").status(200)
    })
    .post(async (req, res) => {
        const req_data = req.body
        const username = req_data.data.user
        const password = req_data.data.pass
        console.log("Req's data ", req_data)

        let conn
        try {
            conn = await pool.getConnection()
            const rows = await conn.query("SELECT * FROM auth_info WHERE (username = ?) AND (pass = ?)", [username, password])
            console.log(rows)
            if (rows.length == 1)
            {
                console.log("Signed in!")
                res.status(200).json({status: true})
                session = req.session
                session.username = username
                session.password = password
                console.log(req.session)
            } else if (rows.length == 0)
            {
                console.log("There is no such of this username/password that matched with out database")
                res.status(200).json({status: false})
            }
        } catch(err) {
            console.log(err)
        } finally {
            if (conn) return conn.end()
        }
    })

app.route("/api/v1/getstatus")
    .get(async (req, res) => {
        if (session) {
            let conn
            try {
                conn = await pool.getConnection()
                const rows = await conn.query("SELECT acc_name, strength, defense, agility, stamina FROM auth_info WHERE (username = ?) AND (pass = ?)", [session.username, session.password])
                res.status(200).json({status: true, figures: rows[0]})
            } catch (err) {
                console.log(err)
            } finally {
                if (conn) return conn.end()
            }
        } else
            res.json({status: false})
    })

app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})