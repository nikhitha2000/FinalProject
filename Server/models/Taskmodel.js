// models/taskModel.js
const mongoose = require('mongoose');
const checklistItemSchema = new mongoose.Schema({
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
  });

const taskSchema = new mongoose.Schema({
  title: String,
  priority: { type: String, enum: ['LOW', 'MODERATE', 'HIGH'] },
  checklist: [checklistItemSchema],
  assignedEmails: [{ type: String }],
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
