const express = require('express')
const { createUser,loginUser,getAllUser,getSingleUser,deleteUser,updateUser,blockUser, unblockUser, handleRefreshToken, logout,updatePassword} = require('../controller/userControl')
const {authMiddleWare,isAdmin} = require('../middlewears/authMiddelware')
const router = express.Router()

router.post("/register", createUser) // register user
// router.post("/forgotpasword", forgotPassword) // register user
router.put("/password",authMiddleWare, updatePassword)
router.post("/login", loginUser) // login user
router.get("/all-users", getAllUser) //get all users
router.get("/refresh", handleRefreshToken);
router.get('/logout', logout)
router.get("/:id", authMiddleWare,isAdmin, getSingleUser) //get a user

router.delete("/:id", deleteUser) //delete a user
router.put("/:id", authMiddleWare, updateUser) //update a user
router.put("/block-user/:id", authMiddleWare, isAdmin,blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unblockUser);








module.exports =router