const express = require('express');
const router = express.Router();
const updateUsernameController = require('../controller/user/updateUsername');

router.get('/', updateUsernameController);

module.exports = router;