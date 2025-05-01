// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET: Check if a student exists by USN
router.get('/:usn', async (req, res) => {
  try {
    const student = await Student.findOne({ usn: req.params.usn });
    if (!student) return res.status(404).json(null);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Register a new student
router.post('/', async (req, res) => {
  try {
    const { name, usn, branch, joiningYear } = req.body;

    // Check if USN already exists
    const existingStudent = await Student.findOne({ usn });
    if (existingStudent) return res.status(400).json({ error: 'USN already exists' });

    const student = new Student({ name, usn, branch, joiningYear });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Failed to register student' });
  }
});

module.exports = router;
