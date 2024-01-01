const express = require('express');
const { createProduct,getaProduct,getallProduct,updateProduct,deleteProduct } = require('../controller/productController');
const { isAdmin, authMiddleWare } = require('../middlewears/authMiddelware');

const router = express.Router()

router.post('/',authMiddleWare,isAdmin, createProduct)
router.get('/', getallProduct)
router.get('/:id', getaProduct)
router.put("/:id",authMiddleWare,isAdmin,updateProduct);
router.delete("/:id",authMiddleWare,isAdmin,deleteProduct);




module.exports = router;