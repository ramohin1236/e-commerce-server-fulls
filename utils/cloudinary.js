const cloudinary = require('cloudinary')



// cloudinary.uploader.upload('your_file_path', { 
//     api_key:"318899551875445",
//     api_secret:"tufHt9eTcw7Mrp03IbvH3Wc_j1Y",
//     timestamp: Math.round(new Date().getTime() / 1000)
// }, function(error, result) { 
//     console.log(result, error) 
// });

  cloudinary.config({ 
    cloud_name:"dgzxzepc8", 
    
    api_key:"318899551875445", 
    
    api_secret:"tufHt9eTcw7Mrp03IbvH3Wc_j1Y",
 
  });

  const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve) => {
         

      cloudinary.uploader.upload(fileToUploads, (result) => {resolve(
        // console.log("888",result),
          {
            url: result.secure_url,
           asset_id: result.asset_id,
           public_id : result.public_id
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };

  const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
         

      cloudinary.uploader.destroy(fileToDelete, (result) => {resolve(
        // console.log("888",result),
          {
            url: result.secure_url,
           asset_id: result.asset_id,
           public_id : result.public_id
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };

  module.exports= {cloudinaryUploadImg, cloudinaryDeleteImg}