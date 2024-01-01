const express = require('express');
const { createProduct,getaProduct,getallProduct,updateProduct } = require('../controller/productController');

const router = express.Router()

router.post('/', createProduct)
router.get('/', getallProduct)
router.get('/:id', getaProduct)
router.put("/:id", updateProduct);




module.exports = router;