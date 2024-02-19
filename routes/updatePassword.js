const express = require('express');
const router = express.Router();
const updatePasswordController = require('../controller/auth/updatePassword');

router.get('/', updatePasswordController);

module.exports = router;