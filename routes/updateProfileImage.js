const express = require('express');
const router = express.Router();
const updateProfileImageController = require('../controller/user/updateProfileImage');

router.get('/', updateProfileImageController);
module.exports = router;