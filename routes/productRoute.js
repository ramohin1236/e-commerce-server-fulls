const express = require('express');
const { createProduct,getaProduct,getallProduct,updateProduct,deleteProduct } = require('../controller/productController');

const router = express.Router()

router.post('/', createProduct)
router.get('/', getallProduct)
router.get('/:id', getaProduct)
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);




module.exports = router;