// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/Taskcontroller');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deletedTask);

module.exports = router;
