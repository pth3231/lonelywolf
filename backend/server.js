const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mariadb = require('mariadb')
const config = require('./config.json')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const { google } = require('googleapis')
const crypto = require("crypto");
const axios = require('axios')

/*
    Create objects for libraries, configs,...
*/
const app = express()
const port = 6767
const oAuth2Client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    "http://localhost:6767/api/v1/fitapi/redirect"
)
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'lonelywolf',
    password: 'lonelywolf',
    database: 'lonelywolf_db',
    connectionLimit: 15
})
const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.activity.write",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/userinfo.profile"
]
let session

/* Pipelines */
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(cookieParser())
app.use(expressSession({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 120000 } // maxage in msec
}))

/* Routes */
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
            if (rows.length == 1) {
                console.log("Signed in!")
                res.status(200).json({ status: true })
                session = req.session
                session.username = username
                session.password = password
                console.log(req.session)
            } else if (rows.length == 0) {
                console.log("There is no such of this username/password that matched with out database")
                res.status(200).json({ status: false })
            }
        } catch (err) {
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
                res.status(200).json({ status: true, figures: rows[0] })
            } catch (err) {
                console.log(err)
            } finally {
                if (conn) return conn.end()
            }
        } else
            res.json({ status: false })
    })

app.route("/api/v1/fitapi/geturl")
    .get((req, res) => {
        const url = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes
        })
        res.json({ url })
    })

app.route("/api/v1/fitapi/redirect")
    .get(async (req, res) => {
        const { code } = req.query
        console.log(code)
        try {
            const { tokens } = await oAuth2Client.getToken(code)
            oAuth2Client.setCredentials(tokens)
            console.log(tokens)
            req.session.tokens = tokens
            res.sendStatus(200)
        } catch (e) {
            console.error(e)
        }
    })

app.route("/api/v1/fitapi/fetch")
    .get(async (req, res) => {
        try {
            const fitness = google.fitness({
                version: "v1",
                auth: oAuth2Client
            })

            const aDayInMillis = 24 * 60 * 60 * 1000
            const now = new Date()
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)

            const startTimeMillis = midnight.getTime()
            const endTimeMillis = Date.now()
            const duration = Date.now() - midnight.getTime()

            const response = await fitness.users.dataset.aggregate({
                userId: "me",
                requestBody: {
                    aggregateBy: [
                        {
                            "dataTypeName": "com.google.step_count.delta"
                        }
                    ],
                    bucketByTime: { durationMillis: duration },
                    startTimeMillis,
                    endTimeMillis
                }
            })

            const fitnessData = response.data.bucket
            let data = {}

            console.log(fitnessData)

            for (let bucket_number = 0; bucket_number < fitnessData.length; bucket_number++) {
                data[bucket_number] = fitnessData[bucket_number].dataset[0].point[0].value[0].intVal
            }

            console.log("Fetched data from Fit API done!")
            console.log(data)
            res.json(data)
        } catch (e) {
            console.error(e)
        }
    })

app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})