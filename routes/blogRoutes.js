const express = require('express');
const router =express.Router()
const {authMiddleWare,isAdmin} = require('../middlewears/authMiddelware');
const { createBlog, updateBlog, getAllBlogs, getBlogs, deleteBlog, liketheBlog } = require('../controller/blogController');




router.post('/',authMiddleWare,isAdmin,createBlog )
router.put('/likes',authMiddleWare,isAdmin,liketheBlog)

router.put('/:id',authMiddleWare,isAdmin,updateBlog )
router.get('/get-all-blogs',authMiddleWare,isAdmin,getAllBlogs )
router.get('/:id',getBlogs)
router.delete('/:id',authMiddleWare,isAdmin,deleteBlog)

module.exports= router