var express = require('express');
var comment = require('../controller/comment.controller.js');  
var verify = require('../middleware/authentication.js');  

const router = express.Router();

// Comments 
router.post('/create', verify.verifyToken, comment.addComment); 
router.get('/get', verify.verifyToken, comment.getComments); 
router.get('/get-details/:id', verify.verifyToken, comment.getDetailsComment); 
router.put('/edit/:id', verify.verifyToken, comment.editComment); 
router.delete('/delete/:id', verify.verifyToken, comment.deleteComment); 

module.exports = router;                             