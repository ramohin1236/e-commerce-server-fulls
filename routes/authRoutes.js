const express = require('express')
const { createUser,loginUser,getAllUser } = require('../controller/userControl')
const router = express.Router()

router.post("/register", createUser) // register user
router.post("/login", loginUser) // login user
router.get("/all-users", getAllUser) //get all users







module.exports =router