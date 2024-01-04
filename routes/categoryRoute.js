const express = require('express');
const { createCategory,updatedCategory,getAllCategory,deleteCategory,getSingleCategory } = require('../controller/categoryController');
const { authMiddleWare, isAdmin } = require('../middlewears/authMiddelware');
const router =express.Router()



router.post('/',authMiddleWare,isAdmin, createCategory)
router.put('/:id',authMiddleWare,isAdmin, updatedCategory)
router.get('/all-category',authMiddleWare,isAdmin, getAllCategory)
router.delete('/:id',authMiddleWare,isAdmin, deleteCategory)
router.get('/:id',authMiddleWare,isAdmin, getSingleCategory)







module.exports= router