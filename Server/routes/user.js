const express = require('express');
const { registerUser, loginUser,getAllEmails } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/emails', getAllEmails);
module.exports = router;
