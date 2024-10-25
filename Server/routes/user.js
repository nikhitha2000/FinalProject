const express = require('express');
const { registerUser, loginUser,getAllEmails,updateUser } = require('../controllers/userController');
const router = express.Router();
const auth = require("../middleware/Auth");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/emails', getAllEmails);
router.put('/update',auth, updateUser);
// router.get('/me', auth, getUser);
module.exports = router;
