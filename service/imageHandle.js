const { cloudinary } = require("../upload/cloudinary.js");

async function uploadImageToCloudinary(req, res) {
    try {
      const file = req.file;
      console.log(file);
      if (!file.mimetype.startsWith('image/')) {
        return res.status(400).send({ message: 'Only image files are allowed' });
      }

      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'Avatar user'   
      });

      console.log('Image uploaded to Cloudinary:', result);     
      res.status(200).send({ avatarUrl: result.secure_url, public_id: result.public_id }); 
     } 
     catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      res.status(500).send({ message: 'Error uploading image' }); 
    }
  }
  
async function deleteImageFromCloudinary(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log('Image deleted from Cloudinary:', result);
      return true;
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return false;
    }
  }

  module.exports = {
    uploadImageToCloudinary, deleteImageFromCloudinary  
};