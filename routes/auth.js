var express = require('express');
var auth = require('../controller/auth.controller');  

const router = express.Router();

// Posts 
router.post('/login', auth.login); 
router.post('/logout', auth.logout); 


module.exports = router;               