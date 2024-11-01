// models/taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  priority: { type: String, enum: ['LOW', 'MODERATE', 'HIGH'] },
  checklist:[
    {
      text: { type: String, required: true },
      done: { type: Boolean, default: false },
    },
  ],
  status: { type: String, default: "to-do" },
  assignedEmails: [{ type: String }],
  dueDate: { type: Date,default: "" },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
