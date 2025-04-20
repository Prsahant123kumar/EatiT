const express = require('express');
const multer = require('multer');
const { identifyImage} = require('../controllers/identifyController.js');
const {isAuthenticated} = require('../middlewares/isAuthenticated.js');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST /api/identify
router.post('/', isAuthenticated, upload.single('image'), identifyImage);

module.exports = router;
