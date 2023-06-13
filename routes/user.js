var express = require('express');
var user = require('../controller/user.controller.js');  

const router = express.Router();

// Users 
router.get('/all-user', user.getUsers);
router.post('/create', user.registerUser);
router.get('/details/:id', user.getDetailsUser);
router.put('/edit/:id', user.editUser);
router.delete('/delete/:id', user.deleteUser);
router.get('/get-posts/:id', user.getUserPosts);

module.exports = router;       