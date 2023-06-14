var express = require('express');
var post = require('../controller/post.controller.js');  
var verify = require('../middleware/authentication.js');  

const router = express.Router();

// Posts 
router.post('/create/:id', verify.verifyToken, post.addPost); 
router.get('/get-all', verify.verifyToken, post.getPosts); 
router.get('/get-details/:id', verify.roleAuthentication, post.getDetailsPost); 
router.put('/edit/:id', post.editPost); 
router.delete('/delete/:id', post.deletePost); 
router.get('/get-comments/:id', post.getCommentsPost); 

module.exports = router;               