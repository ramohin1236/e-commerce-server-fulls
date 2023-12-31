const blogModels = require("../models/blogModels");
const Blog = require("../models/blogModels");
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const validateMongoDbId = require('../utils/validateMongodb');
const cloudinaryUploadImg = require("../utils/cloudinary");

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
    const {id} = req.params;
    validateMongoDbId(id)
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
    validateMongoDbId(id)
       try{
        const getBlog = await Blog.findById(id).populate('likes').populate('dislikes');
        const updateViews = await Blog.findByIdAndUpdate(id, {
            $inc: {numViews: 1}
        },{
            new: true
        })
        res.json(getBlog)
       }
       catch(error){
             throw new Error(error)
       }
})

const deleteBlog= asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
       try{
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog)
       }
       catch(error){
             throw new Error(error)
       }
})
const liketheBlog = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    validateMongoDbId(postId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(postId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        postId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  });

  const disliketheBlog = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    validateMongoDbId(postId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(postId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        postId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  });

  const uploadBlogImages= asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    
    try{
      const uploader =(path)=>cloudinaryUploadImg(path, 'images');
      const urls= [];
      const files = req.files;

      for(const file of files){
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        // fs.unlinkSync(path)
      }
      const findBlog = await Blog.findByIdAndUpdate(id,{
        images: urls.map((file)=>{

        return file
        }),
      },
      {
        new: true
      });
      res.json(findBlog)
    }
 catch(error){
    throw new Error(error)
 }

})

module.exports= {
    createBlog,
    updateBlog,
    getAllBlogs,
    getBlogs,
    deleteBlog,
    liketheBlog,
    disliketheBlog,
    uploadBlogImages

}