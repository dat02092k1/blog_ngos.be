var express = require('express');
var comment = require('../controller/comment.controller.js');  

const router = express.Router();

// Comments 
router.post('/create', comment.addComment); 
router.get('/get', comment.getComments); 
router.get('/get-details/:id', comment.getDetailsComment); 
router.put('/edit/:id', comment.editComment); 
router.delete('/delete/:id', comment.deleteComment); 

module.exports = router;       