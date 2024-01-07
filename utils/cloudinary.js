const cloudinary = require('cloudinary')


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


  const cloudinaryUploading = async(fileToUploads)=>{
    return new Promise((reslove)=>{
       cloudinary.uploader.upload(fileToUploads,(result)=>{
        reslove({
            url: result.secure_url
        },{
            resource_type: "auto",
        })
       })
    })
  }

  module.exports= cloudinaryUploading