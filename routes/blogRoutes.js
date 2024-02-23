const express = require('express');
const router =express.Router()
const {authMiddleWare,isAdmin} = require('../middlewears/authMiddelware');
const { createBlog, updateBlog, getAllBlogs, getBlogs, deleteBlog, liketheBlog, disliketheBlog, uploadBlogImages } = require('../controller/blogController');
const { blogImgResize, uploadPhoto } = require('../middlewears/uploadingImage');




router.post('/',authMiddleWare,isAdmin,createBlog )
router.put("/upload-blog/:id", authMiddleWare,isAdmin,uploadPhoto.array('images',10),blogImgResize,uploadBlogImages)

router.put('/likes',authMiddleWare,liketheBlog)
router.put('/dis-likes',authMiddleWare,disliketheBlog)

router.put('/:id',authMiddleWare,isAdmin,updateBlog )
router.get('/get-all-blogs',getAllBlogs )
// router.get('/get-all-blogs',authMiddleWare,isAdmin,getAllBlogs )
router.get('/:id',getBlogs)
router.delete('/:id',authMiddleWare,isAdmin,deleteBlog)

module.exports= router