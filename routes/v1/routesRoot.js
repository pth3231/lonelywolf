const express = require('express')
let router = express.Router()

/* Routes */
router.get('/', (req, res) => {
    res.send("This is our API!")
})

module.exports = router