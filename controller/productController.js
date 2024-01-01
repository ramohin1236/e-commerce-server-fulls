const asyncHandler = require('express-async-handler');
const Product = require("../models/productModels")
const slugify = require('slugify');
const validateMongoDbId = require('../utils/validateMongodb');


const createProduct = asyncHandler(async(req,res)=>{

    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body) 
        res.json(newProduct)
    }
    catch(error){
     throw new Error(error)
    }

 
})
// update product

const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    // validateMongoDbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      res.json(updateProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

// find a single product
const getaProduct = asyncHandler(async(req,res)=>{
     const {id} = req.params
     try{
        const findProduct = await Product.findById(id)
        res.json(findProduct)
     }
     catch(error){
        throw new Error(error)
     }
})
// find a single product
const getallProduct = asyncHandler(async(req,res)=>{
     
     try{
        const findProduct = await Product.find()
        res.json(findProduct)
     }
     catch(error){
        throw new Error(error)
     }
})


module.exports={
    createProduct,
    getaProduct,
    getallProduct,
    updateProduct
}