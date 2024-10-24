// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/Taskcontroller');

// Route to fetch tasks with filtering
router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);


module.exports = router;
