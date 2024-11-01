const Task = require('../models/Taskmodel');

// Function to create a new task
exports.createTask = async (req, res) => {
  try {
      const newTask = new Task(req.body);
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
  } catch (error) {
      console.error("Error saving task:", error);
      res.status(500).json({ message: "Error saving task" });
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
  const { taskId } = req.params;
  const updatedData = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ data: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

exports.deletedTask=  async (req, res) => {
  const { id } = req.params;
  try {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
          return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting task" });
  }
};