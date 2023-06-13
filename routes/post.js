var express = require('express');
var post = require('../controller/post.controller.js');  

const router = express.Router();

// Posts 
router.post('/create/:id', post.addPost); 
router.get('/get-all', post.getPosts); 
router.get('/get-details/:id', post.getDetailsPost); 
router.put('/edit/:id', post.editPost); 

module.exports = router;       