const User = require("../models/userModels");


const createUser = async(req,res)=>{
 const email = req.body.email;
 const findUser= await User.findOne({email: email})
if(!findUser){
    // create user
    const newUser =await  User.create(req.body)
    res.json(newUser)
}
else{
    res.json({
        msg: "User already Exists",
        success: false
    })
}
};

module.exports = {createUser}