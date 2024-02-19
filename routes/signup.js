const express = require('express');
const router = express.Router();
const signupController = require('../controller/auth/signup');

router.get('/', signupController);

module.exports = router;
