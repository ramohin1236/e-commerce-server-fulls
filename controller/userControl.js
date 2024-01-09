const { generateJwtToken } = require("../config/jwt");
const User = require("../models/userModels");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../utils/validateMongodb");
const jwt = require('jsonwebtoken');
const { generaterefreshToken } = require("../config/refreshToken");
// const sendEmail = require("./mailController");


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

   // admin login

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generaterefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateJwtToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });

//    log out user


   
   const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie =req.cookies;
    if(!cookie?.refreshToken)throw new Error("No Refresh Token in Cookies")
    const refreshToken = cookie.refreshToken;
     const user = await User.findOne({refreshToken})
     if(!user) throw new Error("No Refresh Token or Don't match")
      jwt.verify(refreshToken, process.env.JWT_SECRET,(err, decoded)=>{
    if(err || user.id !== decoded.id){
        throw new Error("There is something wrong with refresh token")
    }
    const accessToken = generateJwtToken(user?._id)
    res.json({accessToken})
  
  
})
   
})
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate( 
    { refreshToken: refreshToken }, // Filter object to find the user based on refreshToken
    {  refreshToken: "" } );
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  });
   

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

   const updatePassword = asyncHandler(async(req,res)=>{
       const {_id}= req.user;
    
       const {password} = req.body;
       validateMongoDbId(_id)
       const user = await User.findById(_id)
       if(password){
        user.password = password;
        const updatedPassword = await user.save()
        res.json(updatedPassword)

       }
       else{
        res.json(user)
       }
   })


   

   const getWishlist = asyncHandler(async (req, res) => {

    const { id } = req.user;
   
    try {
      const findUser = await User.findById(id).populate("wishlist");
      res.json(findUser);
    } catch (error) {
      throw new Error(error);
    }
  });

  // save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            address: req?.body?.address,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  
  });
  

//    const forgotPassword = asyncHandler(async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) throw new Error("User not found with this email");
//     try {
//       const token = await user.createPasswordResetToken();
//       await user.save();
//       const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
//       const data = {
//         to: email,
//         text: "Hey User",
//         subject: "Forgot Password Link",
//         html: resetURL,
//       };
//        sendEmail(data);
//       res.json(token);
//     } catch (error) {
//       throw new Error(error);
//     }
//   });

// get wishlist

     

module.exports = {
    createUser,
    loginUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    loginAdmin,
    getWishlist,
    saveAddress
}