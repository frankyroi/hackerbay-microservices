const express = require('express')
const patchJsonController = require('../controllers/patchJsonController')
const { verifyToken } = require('../middleware/customMiddleware')

const router = express.Router()


// Route to patch json objects.
router.patch('/', verifyToken, patchJsonController.patch_json)

module.exports = router