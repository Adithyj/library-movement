// Example: index.js or students.js
app.post('/api/students', async (req, res) => {
    const { usn, name, branch, joiningYear } = req.body;
  
    try {
      const existingStudent = await Student.findOne({ usn });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student already exists' });
      }
  
      const newStudent = new Student({ usn, name, branch, joiningYear });
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  