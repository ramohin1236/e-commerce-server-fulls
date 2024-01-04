const blogModels = require("../models/blogModels");
const Blog = require("../models/blogModels");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodb');

const createBlog= asyncHandler(async(req,res)=>{
       try{
        const newBlog = await Blog.create(req.body);
        res.json(newBlog)
       }
       catch(error){
             throw new Error(error)
       }
})
const updateBlog= asyncHandler(async(req,res)=>{
    const {id} = req.params
       try{
        const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{
            new: true
        });
        res.json(updateBlog)
       }
       catch(error){
             throw new Error(error)
       }
})
const getAllBlogs= asyncHandler(async(req,res)=>{
    const {id} = req.params
       try{
        const getBlog = await Blog.find(id);
    
        res.json(getBlog)
       }
       catch(error){
             throw new Error(error)
       }
})

const getBlogs= asyncHandler(async(req,res)=>{
    const {id} = req.params
       try{
        const getBlog = await Blog.findById(id);
        const updateViews = await Blog.findByIdAndUpdate(id, {
            $inc: {numViews: 1}
        },{
            new: true
        })
        res.json(updateViews)
       }
       catch(error){
             throw new Error(error)
       }
})

module.exports= {
    createBlog,
    updateBlog,
    getAllBlogs,
    getBlogs

}



