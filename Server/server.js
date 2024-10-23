// app.js (your existing code with added task routes)
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/Taskroutes');  // <-- Add task routes
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)  // Using the MongoDB URI from .env
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); 

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
