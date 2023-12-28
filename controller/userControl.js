const User = require("../models/userModels");
const asyncHandler = require('express-async-handler')

const createUser = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    const findUser= await User.findOne({email: email})
   if(!findUser){
       // create user
       const newUser =await  User.create(req.body)
       res.json(newUser)
   }
   else{
      throw new Error("User Already Exists")
   }
   })


   const loginUser = asyncHandler(async(req,res)=>{
     const {email,password}= req.body;
    //  cheak if user exists or not
    const findUser = await User.findOne({email})
    if(findUser && await findUser.isPasswordMatched(password) ){
      res.json(findUser)
    }
    else{
        throw new Error("Invaild Creadentials")
    }
     console.log(email,password);
   })

module.exports = {createUser,loginUser}