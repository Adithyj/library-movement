// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (local DB)
mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/students', studentRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require('cors');
app.use(cors());
