const express = require('express')


const app = express()
const port = 6767

app.get('/', (req, res) => {
    res.send("Hello, World!")
})

app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})