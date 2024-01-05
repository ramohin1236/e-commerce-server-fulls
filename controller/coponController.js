const Coupon = require('../models/coponModels');
const validateMongodbid = require('../utils/validateMongodb');
const asyncHandler = require("express-async-handler");


const createCoupon= asyncHandler(async(req,res)=>{
    try{
       const newCoupon = await Coupon.create(req.body)
       res.json(newCoupon)
    }catch(error){
        throw new Error(error)
    }
})

const getAllCoupon= asyncHandler(async(req,res)=>{
    const {id} = req.params
       try{
        const getcoupon = await Coupon.find(id);
    
        res.json(getcoupon)
       }
       catch(error){
             throw new Error(error)
       }
})

const updatedCoupon= asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbid(id)
 try{
   const updateCoupon = await Coupon.findByIdAndUpdate(id,req.body,{
    new: true,
   });
   res.json(updateCoupon)
 }
 catch(error){
    throw new Error(error)
 }
})

const deleteCoupon= asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbid(id)
    try{
        const deleteCoupon = await Coupon.findByIdAndDelete(id,req.body,{
            new: true,
           });
    
        res.json(deleteCoupon)
       }
       catch(error){
             throw new Error(error)
       }
})










module.exports={
    createCoupon,
    getAllCoupon,
    updatedCoupon,
    deleteCoupon
}