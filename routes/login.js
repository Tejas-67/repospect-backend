const express = require('express');
const router = express.Router();
const loginController = require('../controller/auth/login');

router.get('/', loginController);
module.exports = router;