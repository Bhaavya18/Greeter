const express = require('express');
const router = express.Router();

const {generateQRCode} = require('../controllers/qr');

router.post('/home',generateQRCode);

module.exports=router;