const express = require('express')
const { createUser,loginUser,getAllUser,getSingleUser,deleteUser,updateUser } = require('../controller/userControl')
const {authMiddleWare,isAdmin} = require('../middlewears/authMiddelware')
const router = express.Router()

router.post("/register", createUser) // register user
router.post("/login", loginUser) // login user
router.get("/all-users", getAllUser) //get all users
router.get("/:id", authMiddleWare,isAdmin, getSingleUser) //get a user
router.delete("/:id", deleteUser) //delete a user
router.put("/:id",authMiddleWare, updateUser) //update a user







module.exports =router