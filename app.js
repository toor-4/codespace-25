require("dotenv").config()
const express = require("express")
const app = express()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("./models/user")

app.use(express.json())

app.get("/" , (req, res) => {
    res.send("<h1>Github CodeSpace</h1>")
})

app.post("/register", async (req, res) => {
  try {
    // get all data from body
    const { name, email, password } = req.body
    // all data should exists
    if (!(name && email && password)) {
      req.status(404).json({ "message" : "All fields should be filled up."})
    }
    // check if iser already exists
    const existingUser = await User.findOne({email})
    if (existingUser) {
      req.status(401).send("User already exists with this email.")
    }
    // encrypt the passwd
    const encryptedPassword = await bcrypt.hash(password,10)
    // save the user in the database
    const user = await User.create({ 
      name,
      email,
      password: encryptedPassword
    })
    // generate a token for a user and send it
    const token =  jwt.sign(
      { id: user._id, name},
      "shhhh" // process.env.jwtsecret
    ,
    {
    expiresIn: "3hr",
    }
  );
  user.token = token
  user.password = undefined
  
  res.status(201).json({
    "status": "success",
    token,
    user
  })
  } catch (error) {
    console.log(error)
      }
})

module.exports = app