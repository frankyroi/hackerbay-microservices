const express = require('express');
const router = express.Router();

const userController = require('../controllers/authController');



// Login user and sign JWT
router.post('/', userController.user_cred);



module.exports = router;
