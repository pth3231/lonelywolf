const express           = require('express')
const cors              = require('cors')
const bodyParser        = require('body-parser')
const cookieParser      = require('cookie-parser')
const crypto            = require("crypto");
const axios             = require('axios')

// Import routes (controllers)
const routes_fitapi     = require("./routes/v1/fitapi/routesFitAPI")
const routes_signin     = require("./routes/v1/auth/routesSignin")
const routes_signup     = require("./routes/v1/auth/routesSignup")
const routes_getstatus  = require("./routes/v1/routesGetStatus")
const routes_gettask    = require("./routes/v1/routesGetTask")
const routes_root       = require("./routes/v1/routesRoot")
const config            = require('./routes/config.json')

// Create app object for express()
const app = express()
const port = 6767

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

// Route configurations
app.use("/api/v1", routes_root)
app.use("/api/v1", routes_gettask)
app.use("/api/v1", routes_getstatus)
app.use("/api/v1/auth", routes_signin)
app.use("/api/v1/auth", routes_signup)
app.use("/api/v1/fitapi", routes_fitapi)

/* Open the PORT */
app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})