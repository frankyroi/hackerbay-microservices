const express = require('express')
const thumbnailController = require('../controllers/thumbnailController')
const { verifyToken } = require('../middleware/customMiddleware')

const router = express.Router()


// Route to generate image thumbnail.
router.post('/', verifyToken, thumbnailController.create_thumbnail)


module.exports = router