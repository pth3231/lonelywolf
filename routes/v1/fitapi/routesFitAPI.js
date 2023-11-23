const { google } = require('googleapis')
const express = require('express')
let router = express.Router()
const config = require('../../config.json')

// Initialize OAuth2 Client, so that consent window can verify the authentication of Google account
const oAuth2Client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    "http://localhost:6767/api/v1/fitapi/redirect"
)

// Scope of permissions that this app requires, some of them are temporary and can be deleted later
const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.activity.write",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/userinfo.profile"
]

router.route("/geturl")
    .get((req, res) => {
        // Generate the url to Consent Screen
        const url = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes
        })
        res.json({ url })
    })

router.route("/redirect")
    .get(async (req, res) => {
        // Extract code from Consent Screen
        const { code } = req.query
        console.log(code)
        try {
            // Wait for the tokens from code
            const { tokens } = await oAuth2Client.getToken(code)
            oAuth2Client.setCredentials(tokens)
            console.log(tokens)
            res.sendStatus(200)
        } catch (e) {
            console.error(e)
        }
    })

router.route("/fetch")
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

module.exports = router