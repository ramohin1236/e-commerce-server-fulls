const { generateJwtToken } = require("../config/jwt");
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

// login user
   const loginUser = asyncHandler(async(req,res)=>{
     const {email,password}= req.body;
    //  cheak if user exists or not
    const findUser = await User.findOne({email})
    if(findUser && await findUser.isPasswordMatched(password) ){
      res.json({
        _id: findUser._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile:findUser?.mobile,
        token: generateJwtToken(findUser?._id)

      })
    }
    else{
        throw new Error("Invaild Creadentials")
    }
     console.log(email,password);
   })

// get all user
 
    const getAllUser = asyncHandler(async(req,res)=>{
        try{
             const getallUser = await User.find();
             res.json(getallUser)
        }
        catch(error){
            throw new Error(error)
        }
    })

    // get single user
    const getSingleUser = asyncHandler(async(req,res)=>{
        console.log(req.params);
        const {id} =req.params
        try{
        const getUser = await User.findById(id)
          res.json(getUser)
        }
        catch(error){
            throw new Error(error)
        }
    })

module.exports = {createUser,loginUser,getAllUser,getSingleUser}