const express = require('express')
const { createUser,loginUser,getAllUser,getSingleUser,deleteUser,updateUser } = require('../controller/userControl')
const router = express.Router()

router.post("/register", createUser) // register user
router.post("/login", loginUser) // login user
router.get("/all-users", getAllUser) //get all users
router.get("/:id", getSingleUser) //get a user
router.delete("/:id", deleteUser) //delete a user
router.put("/:id", updateUser) //update a user







module.exports =router