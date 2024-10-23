const Task = require('../models/Taskmodel');

// Function to create a new task
exports.createTask = async (req, res) => {
    const { title, priority, checklist ,dueDate } = req.body;
  

    try {
      const newTask = new Task({ title, priority, checklist ,dueDate: new Date(dueDate) });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task' });
    }
  };

// Function to get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};
