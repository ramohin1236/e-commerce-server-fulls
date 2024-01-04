const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const validateMongodbId = require("../utils/validateMongodb")


const createBrand= asyncHandler(async(req,res)=>{
 try{
   const newBrand = await Brand.create(req.body);
   res.json(newBrand)
 }
 catch(error){
    throw new Error(error)
 }
})

const updatedBrand= asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id)
 try{
   const updateBrand = await Brand.findByIdAndUpdate(id,req.body,{
    new: true,
   });
   res.json(updateBrand)
 }
 catch(error){
    throw new Error(error)
 }
})
const getAllBrand= asyncHandler(async(req,res)=>{
    const {id} = req.params
       try{
        const getBrand = await Brand.find(id);
    
        res.json(getBrand)
       }
       catch(error){
             throw new Error(error)
       }
})
const deleteBrand= asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbId(id)
    try{
        const deleteBrand = await Brand.findByIdAndDelete(id,req.body,{
            new: true,
           });
    
        res.json(deleteBrand)
       }
       catch(error){
             throw new Error(error)
       }
})
const getSingleBrand= asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbId(id)
    try{
        const getaBrand = await Brand.findById(id);
    
        res.json(getaBrand)
       }
       catch(error){
             throw new Error(error)
       }
})



module.exports={
    createBrand,
    updatedBrand,
    getAllBrand,
    deleteBrand,
    getSingleBrand
}