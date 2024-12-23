const express = require('express');
const {
  requestOTP,
  verifyOTP,
  resetPassword,
} = require('../controllers/resetPassword');

const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

module.exports = router;
