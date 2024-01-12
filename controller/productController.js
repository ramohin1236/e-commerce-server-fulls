const asyncHandler = require('express-async-handler');
const Product = require("../models/productModels")
const slugify = require('slugify');
const fs = require('fs');
const validateMongoDbId = require('../utils/validateMongodb');
const User = require('../models/userModels');
const {cloudinaryUploadImg,cloudinaryDeleteImg} = require('../utils/cloudinary');



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

 const rating = asyncHandler(async(req,res)=>{
     const {_id} = req.user;
     const {star,prodId, comment}= req.body;
     try{
        const product= await Product.findById(prodId)
        let alreadyRated = product.ratings.find((userId)=>userId.posteby.toString()=== _id.toString());
        if(alreadyRated){
           const updateRating = await Product.updateOne({
            ratings: {$elemMatch: alreadyRated},
           },
           {
            $set: { "ratings.$.star": star,  "ratings.$.comment": comment},
          },{
            new: true,
        })

        }
        else{
           const rateProduct = await Product.findByIdAndUpdate(prodId,{
            $push: {
                ratings:{
                    star: star,
                    comment: comment,
                    posteby: _id
                }
            }
           },{
            new: true
           }
            );
 
        }
        const getallratings = await Product.findById(prodId)
        let totalRatings = getallratings.ratings.length;
        let sumofRatings = getallratings.ratings.map((item)=>item.star).reduce((previous, current)=>previous+current, 0)
        let actualRatings = Math.round(sumofRatings / totalRatings)
        let finalProduct =  await Product.findByIdAndUpdate(prodId,{
            totalrating: actualRatings,
        },{
            new: true
        })
        res.json(finalProduct)
     }

     catch(error){
        throw new Error(error)
     }
 })


 const uploadImages= asyncHandler(async(req,res)=>{
      
      try{
          const uploader =(path)=>cloudinaryUploadImg(path, 'images');
          const urls= [];
          const files = req.files;

          for(const file of files){
            const { path } = file;
            // console.log(path);
            const newPath = await uploader(path)
           
            urls.push(newPath)
           
          }

          const images =urls.map((file)=>{
                return file
            })
            res.json(images)
   }
     catch(error){
        throw new Error(error)
     }
   
})


const deleteImages= asyncHandler(async(req,res)=>{
      const {id}= req.params
    try{
        const deleted =cloudinaryDeleteImg(id, 'images');
    res.json({message : "Deleted"})
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
    addToWishList,
    rating,
    uploadImages,
    deleteImages
}