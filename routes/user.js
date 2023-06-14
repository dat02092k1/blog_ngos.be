var express = require('express');
var user = require('../controller/user.controller.js');  
var verify = require('../middleware/authentication.js');  

const router = express.Router();

// Users        
router.get('/all-user', verify.roleAuthentication, user.getUsers);
router.post('/create', user.registerUser);
router.get('/details/:id', verify.verifyToken, user.getDetailsUser);
router.put('/edit/:id', user.editUser);
router.delete('/delete/:id', user.deleteUser);
router.get('/get-posts/:id', user.getUserPosts);

module.exports = router;       