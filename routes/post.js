var express = require('express');
var post = require('../controller/post.controller.js');  

const router = express.Router();

// Posts 
router.post('/create/:id', post.addPost); 
 
module.exports = router;       