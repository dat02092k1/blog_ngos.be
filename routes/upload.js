var express = require('express');
var imgService = require('../service/imageHandle.js')
var verify = require('../middleware/authentication.js');  

var upload = require('../upload/multer.js').upload; 
const router = express.Router();

router.post('/upload', verify.verifyToken, upload.single('image'), imgService.uploadImageToCloudinary);


module.exports = router;       