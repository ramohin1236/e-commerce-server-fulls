const asyncHandler = require('express-async-handler');
const Product = require("../models/productModels")
const slugify = require('slugify');
const validateMongoDbId = require('../utils/validateMongodb');
const User = require('../models/userModels');


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

        //filter by price gater then less then
        let queryStr = JSON.stringify(queryObj)
        queryStr= queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match)=>`$${match}`)
       let query = Product.find(JSON.parse(queryStr))

        //  sorting by alphabet 

        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy)
        }
        else{
            query = query.sort("-createdAt")
        }

        // limiting the fields-----------------
          if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields)

          }
          else{
            query = query.select("-__v")
          }

        // pagination-------------------------------
         const page = req.query.page;
         const limit = req.query.limit;
         const skip =(page -1) * limit;
         query = query.skip(skip).limit(limit);
         if(req.query.page){
            const productCount = await Product.countDocuments();
            if(skip >=productCount) throw new Error("This page is no exists")
         }
         console.log(page,limit,skip);

        const findProduct = await query
        res.json(findProduct)
     }
     catch(error){
        throw new Error(error)
     }
})

 const addToWishList = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {prodId} =req.body;
    try{
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id)=>id.toString()=== prodId);
        if(alreadyAdded){
           let user = await User.findByIdAndUpdate(_id,{
            $pull: {wishlist: prodId}
           },{
            new: true
           })
           res.json(user)
        }
        else{
            let user = await User.findByIdAndUpdate(_id,{
                $push: {wishlist: prodId}
               },{
                new: true
               })
               res.json(user)
        }
        
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
    deleteProduct,
    addToWishList
}