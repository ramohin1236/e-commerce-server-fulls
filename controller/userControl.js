const { generateJwtToken } = require("../config/jwt");
const User = require("../models/userModels");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../utils/validateMongodb");
const { generaterefreshToken } = require("../config/refreshToken");


// create user
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

  //update user
  const updateUser = asyncHandler(async(req,res)=>{
    const {_id}= req.user
    try{
      const updateUsers= await User.findByIdAndUpdate(_id,
        {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile
        },
        {
           new: true,
        }
      );
      res.json(updateUsers)
    }

    catch(error){
    throw new Error(error)
    }
  })

// login user
   const loginUser = asyncHandler(async(req,res)=>{
     const {email,password}= req.body;
    //  cheak if user exists or not
    const findUser = await User.findOne({email})
    if(findUser && await findUser.isPasswordMatched(password) ){
     const refreshToken = await generaterefreshToken(findUser?._id)
     const updateUser = await User.findByIdAndUpdate(findUser?.id,
        {refreshToken: refreshToken},
        {new: true}
        );
        res.cookie("refreshToken", refreshToken,{
            httpOnly: true,
            
            maxAge: 72*60*60*1000
        })
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
     
        const {id} =req.params
        validateMongoDbId(id)
        try{
        const getUser = await User.findById(id)
          res.json(getUser)
        }
        catch(error){
            throw new Error(error)
        }
    })

    // delete user
    const deleteUser = asyncHandler(async(req,res)=>{
        const {id}= req.params;
        validateMongoDbId(id)

        try{
            const deleteUserr = await User.findByIdAndDelete(id)
            res.json(deleteUserr)
        }
        catch(error){
            throw new Error(error)
        }
    });

    const blockUser = asyncHandler(async (req, res) => {
        const { id } = req.params;
        validateMongoDbId(id)
      
        try {
          const blockusr = await User.findByIdAndUpdate(
            id,
            {
              isBlocked: true,
            },
            {
              new: true,
            }
          );
          res.json(blockusr);
        } catch (error) {
          throw new Error(error);
        }
      });
      const unblockUser = asyncHandler(async (req, res) => {
        const { id } = req.params;
        validateMongoDbId(id)
        

        try {
          const unblock = await User.findByIdAndUpdate(
            id,
            {
              isBlocked: false,
            },
            {
              new: true,
            }
          );
          res.json({
            message: "User UnBlocked",
          });
        } catch (error) {
          throw new Error(error);
        }
      });

module.exports = {
    createUser,
    loginUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser
}