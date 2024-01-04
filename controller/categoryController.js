const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModels");
const validateMongodbId = require("../utils/validateMongodb")


const createCategory= asyncHandler(async(req,res)=>{
 try{
   const newCategory = await Category.create(req.body);
   res.json(newCategory)
 }
 catch(error){
    throw new Error(error)
 }
})

const updatedCategory= asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id)
 try{
   const updateCategory = await Category.findByIdAndUpdate(id,req.body,{
    new: true,
   });
   res.json(updateCategory)
 }
 catch(error){
    throw new Error(error)
 }
})
const getAllCategory= asyncHandler(async(req,res)=>{
    const {id} = req.params
       try{
        const getCategory = await Category.find(id);
    
        res.json(getCategory)
       }
       catch(error){
             throw new Error(error)
       }
})
const deleteCategory= asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbId(id)
    try{
        const deleteCategory = await Category.findByIdAndDelete(id,req.body,{
            new: true,
           });
    
        res.json(deleteCategory)
       }
       catch(error){
             throw new Error(error)
       }
})
const getSingleCategory= asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongodbId(id)
    try{
        const getaCategory = await Category.findById(id);
    
        res.json(getaCategory)
       }
       catch(error){
             throw new Error(error)
       }
})



module.exports={
    createCategory,
    updatedCategory,
    getAllCategory,
    deleteCategory,
    getSingleCategory
}