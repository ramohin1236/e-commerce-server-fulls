const User = require("../models/userModels.js")
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')

const authMiddleWare = asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
        try{
           if(token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded?.id)
            req.user= user
            next()
           }
        }
        catch(error){
         throw new Error("Not Authorized token expired")
        }
    }
    else{
   throw new Error("There is no token attached to header")
    }
})

const isAdmin =asyncHandler(async(req,res,next)=>{
    // console.log(req.user);
    const {email} =req.user;
    const adminUser = await User.findOne({email})
    if(adminUser.role !== "admin"){
        throw new Error("You are not admin")
    }
    else{
        next()
    }
})


module.exports= {authMiddleWare,isAdmin};