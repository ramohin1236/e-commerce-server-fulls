const express = require('express');
const { createBrand,updatedBrand,getAllBrand,deleteBrand,getSingleBrand } = require('../controller/brandController');
const { authMiddleWare, isAdmin } = require('../middlewears/authMiddelware');
const router =express.Router()





router.post('/',authMiddleWare,isAdmin, createBrand)
router.put('/:id',authMiddleWare,isAdmin, updatedBrand)
router.get('/all-Brand',authMiddleWare,isAdmin, getAllBrand)
router.delete('/:id',authMiddleWare,isAdmin, deleteBrand)
router.get('/:id',authMiddleWare,isAdmin, getSingleBrand)







module.exports= router