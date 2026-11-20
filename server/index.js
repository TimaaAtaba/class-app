const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const Student = mongoose.model('Student', { name: String, subject: String });

// Read
app.get('/students', async (req, res) => {
  res.json(await Student.find());
});

// Create
app.post('/students', async (req, res) => {
  res.json(await Student.create(req.body));
});

// Update
app.put('/students/:id', async (req, res) => {
  res.json(await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// Delete
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

app.listen(3000, () => console.log('Server running on port 3000'));