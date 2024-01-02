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
// update product

const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    // validateMongoDbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updateProduct = await Product.findOneAndDelete({ _id: id }, req.body, {
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
    //  console.log(req.query);
     try{
        const queryObj= {...req.query}
        const exclusiveFields =["page", "sort", "limit", "fields"];
     exclusiveFields.forEach((el)=>delete queryObj[el])
        console.log(queryObj);

        //sort by price gater then less then
        let queryStr = JSON.stringify(queryObj)
        queryStr= queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match)=>`$${match}`)
        const query = Product.find(JSON.parse(queryStr))
    //    console.log(JSON.parse(queryStr));
        const findProduct = await query
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
    updateProduct,
    deleteProduct
}