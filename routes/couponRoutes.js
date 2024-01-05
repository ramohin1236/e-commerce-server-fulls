const express = require('express');
const { createCoupon, getAllCoupon, updatedCoupon,deleteCoupon } = require('../controller/coponController');
const { authMiddleWare, isAdmin } = require('../middlewears/authMiddelware');
const router =express.Router()


router.post('/',authMiddleWare, isAdmin, createCoupon)
router.get('/',authMiddleWare, isAdmin, getAllCoupon)
router.put('/:id',authMiddleWare, isAdmin, updatedCoupon)
router.delete('/:id',authMiddleWare, isAdmin, deleteCoupon)


module.exports = router