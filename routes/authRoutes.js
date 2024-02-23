const express = require('express')
const { createUser,loginUser,getAllUser,getSingleUser,deleteUser,updateUser,blockUser, unblockUser, handleRefreshToken, logout,updatePassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus, getAllUserOrders, getOrderByUserId} = require('../controller/userControl')
const {authMiddleWare,isAdmin} = require('../middlewears/authMiddelware')
const router = express.Router()

router.post("/register", createUser) // register user
// router.post("/forgotpasword", forgotPassword) // register user
router.put("/password",authMiddleWare, updatePassword)
router.post("/login", loginUser) // login user
router.post("/admin-login", loginAdmin) // login admin
router.post("/cart",authMiddleWare,userCart) 
router.get("/cart",authMiddleWare,getUserCart) 
router.post("/cart/apply-coupon",authMiddleWare,applyCoupon) 
router.post("/cart/cash-order",authMiddleWare,createOrder) 
// router.get("/get-orders",authMiddleWare, getOrders) 
router.get("/get-orders",authMiddleWare, getOrders) 
router.get("/get-all-orders",authMiddleWare,isAdmin, getAllUserOrders) 
router.post("/getorderbyuser/:id",authMiddleWare,isAdmin, getOrderByUserId) 



router.get("/all-users", getAllUser) //get all users
router.get("/refresh", handleRefreshToken);
router.get('/logout', logout)
router.get('/wishlist',authMiddleWare, getWishlist)
router.put("/save-address", authMiddleWare,saveAddress) //update a user
router.delete("/empty-cart",authMiddleWare,emptyCart ) //delete a user

router.get("/:id", authMiddleWare,getSingleUser) //get a user
router.delete("/:id", deleteUser) //delete a user

router.put('/order/update-order/:id', authMiddleWare,isAdmin, updateOrderStatus)

router.put("/:id", authMiddleWare, updateUser) //update a user

router.put("/block-user/:id", authMiddleWare, isAdmin,blockUser);
router.put("/unblock-user/:id", authMiddleWare, isAdmin, unblockUser);








module.exports =router