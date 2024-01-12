const express = require('express');
const { createProduct,getaProduct,getallProduct,updateProduct,deleteProduct,addToWishList,rating, uploadImages, deleteImages } = require('../controller/productController');
const { isAdmin, authMiddleWare } = require('../middlewears/authMiddelware');
const {  productImgResize, uploadPhoto } = require('../middlewears/uploadingImage');

const router = express.Router()

router.post('/',authMiddleWare,isAdmin, createProduct)
router.get('/', getallProduct)
router.get('/:id', getaProduct)

router.put('/wishlist',authMiddleWare, addToWishList)
router.put('/rating',authMiddleWare, rating)
router.put("/upload", authMiddleWare,isAdmin,uploadPhoto.array('images',10),productImgResize,uploadImages)

router.put("/:id",authMiddleWare,isAdmin,updateProduct);

router.delete("/:id",authMiddleWare,isAdmin,deleteProduct);
router.delete("/delete-img/:id",authMiddleWare,isAdmin,deleteImages);






module.exports = router;