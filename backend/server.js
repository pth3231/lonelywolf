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

// Create app object for express()
const app = express()
const port = 6767

// Initialize OAuth2 Client, so that consent window can verify the authentication of Google account
const oAuth2Client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    "http://localhost:6767/api/v1/fitapi/redirect"
)

// Create a Pool object to handling the connection establishment
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'lonelywolf',
    password: 'lonelywolf',
    database: 'lonelywolf_db',
    connectionLimit: 15
})

// Scope of permissions that this app requires, some of them are temporary and can be deleted later
const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.activity.write",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/userinfo.profile"
]
// Variable used for 
let session

/* Pipelines */
// for parsing application/json
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// for allowing cors policy
app.use(cors())

// for parsing cookie
app.use(cookieParser())

// for creating session
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

// This is the route for sign in, use to check if there is any matched result in the database
// If it does, the server will send a cookie and init a new session to validate later 
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
            // Wait for the connection to be established
            conn = await pool.getConnection()

            // Query rows with the matching username and password
            const rows = await conn.query("SELECT * FROM auth_info WHERE (username = ?) AND (pass = ?)", [username, password])
            console.log(rows)

            // If it does exist
            if (rows.length == 1) {
                console.log("Signed in!")

                // Send a successful response for frontend
                res.status(200).json({ status: true })
                session = req.session
                session.username = username
                session.password = password
                console.log(req.session)
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

app.route("/api/v1/getstatus")
    .get(async (req, res) => {
        // If there is a matched session
        if (session) {
            let conn
            try {
                // Wait for the connection to be established
                conn = await pool.getConnection()

                // Query status of character
                const rows = await conn.query("SELECT acc_name, strength, defense, agility, stamina FROM auth_info WHERE (username = ?) AND (pass = ?)", [session.username, session.password])
                
                // Send back an object
                res.status(200).json({ status: true, figures: rows[0] })
            } catch (err) {
                console.log(err)
            } finally {
                // End connection session if the conn is still running
                if (conn) return conn.end()
            }
        } else {
            // If there is not a matched session 
            res.json({ status: false })
        }
    })

app.route("/api/v1/fitapi/geturl")
    .get((req, res) => {
        // Generate the url to Consent Screen
        const url = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes
        })
        res.json({ url })
    })

app.route("/api/v1/fitapi/redirect")
    .get(async (req, res) => {
        // Extract code from Consent Screen
        const { code } = req.query
        console.log(code)
        try {
            // Wait for the tokens from code
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
            // Fit API object  
            const fitness = google.fitness({
                version: "v1",
                auth: oAuth2Client
            })

            const aDayInMillis = 24 * 60 * 60 * 1000

            // Return the time in millisec (for a particular reference time, please check the documentation of Javascript/NodeJS)
            const now = new Date()
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)

            const startTimeMillis = midnight.getTime()
            console.log("Midnight: ", startTimeMillis)
            const endTimeMillis = Date.now()
            console.log("Now: ", endTimeMillis)
            const duration = Date.now() - midnight.getTime()
            console.log("Duration: ", duration)

            // Wait for the response from Google Fit API
            const response = await fitness.users.dataset.aggregate({
                userId: "me",
                requestBody: {
                    aggregateBy: [
                        {
                            "dataTypeName": "com.google.step_count.delta"
                        }
                    ],
                    bucketByTime: { durationMillis: duration.toString() },
                    startTimeMillis: startTimeMillis.toString(),
                    endTimeMillis: endTimeMillis.toString()
                }
            })

            // Retrieve data from the body of the response
            const fitnessData = response.data.bucket
            let data = {}

            console.log(fitnessData)

            for (let bucket_number = 0; bucket_number < fitnessData.length; bucket_number++) {
                console.log(fitnessData[bucket_number].dataset)
                data[bucket_number] = fitnessData[bucket_number].dataset[0].point[0].value[0].intVal
            }

            console.log("Fetched data from Fit API done!")
            console.log(data)
            
            // Send data to frontend
            res.json(data)
        } catch (e) {
            console.error(e)
        }
    })

/* Open the PORT */
app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})