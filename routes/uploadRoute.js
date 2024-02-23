const express = require('express');
const {  productImgResize, uploadPhoto } = require('../middlewears/uploadingImage');
const { isAdmin, authMiddleWare } = require('../middlewears/authMiddelware');
const { uploadImages, deleteImages } = require('../controller/uploadController');

const router = express.Router()



router.post("/", authMiddleWare,isAdmin,uploadPhoto.array('images',10),productImgResize,uploadImages)


router.delete("/delete-img/:id",authMiddleWare,isAdmin,deleteImages);






module.exports = router;