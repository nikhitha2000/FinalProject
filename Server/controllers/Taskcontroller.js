const Task = require('../models/Taskmodel');

// Function to create a new task
exports.createTask = async (req, res) => {
    const { title, priority, checklist ,dueDate,assignedEmails  } = req.body;
    if (dueDate !== "" && dueDate !== null && isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ message: "Invalid due date" });
    }

    try {
      const newTask = new Task({ title, priority, checklist , dueDate: dueDate ? new Date(dueDate) : null,assignedEmails });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error creating task:', error); 
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

exports.updateTask = async (req, res) => {
  try {
      const taskId = req.params.id;
      const updatedTaskData = req.body;
      console.log("Task ID:", taskId);
      console.log("Update Data:", updatedTaskData);
      const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          updatedTaskData,
          { new: true }
      );
      console.log("Updated Task:", updatedTask);
      if (!updatedTask) {
          return res.status(404).json({ message: "Task not found" });
      }

      res.json(updatedTask);
  } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Server error" });
  }
};