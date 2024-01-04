const express = require('express');
const router =express.Router()
const {authMiddleWare,isAdmin} = require('../middlewears/authMiddelware');
const { createBlog, updateBlog, getAllBlogs, getBlogs } = require('../controller/blogController');




router.post('/',authMiddleWare,isAdmin,createBlog )
router.put('/:id',authMiddleWare,isAdmin,updateBlog )
router.get('/get-all-blogs',authMiddleWare,isAdmin,getAllBlogs )
router.get('/:id',getBlogs)

module.exports= router