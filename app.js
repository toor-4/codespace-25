const express = require("express")
const app = express()
require("dotenv").config()


app.get("/" , (req, res) => {
    res.send("<h1>Github CodeSpace</h1>")
})

module.exports = app