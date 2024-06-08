const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/problem-solver', { useNewUrlParser: true, useUnifiedTopology: true });

// Model
const Problem = mongoose.model('Problem', new mongoose.Schema({
    title: String,
    description: String,
    comments: [{ body: String, date: Date, pinned: Boolean }],
}));

// API
app.get('/problems', async (req, res) => {
    const problems = await Problem.find();
    res.json(problems);
});

app.post('/problems', async (req, res) => {
    const newProblem = new Problem(req.body);
    await newProblem.save();
    res.json(newProblem);
});

// Əlavə Ediləcək PUT Metodu
app.put('/problems/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(updatedProblem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating problem', error });
  }
});

// Əlavə Ediləcək DELETE Metodu
app.delete('/problems/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Problem.findByIdAndDelete(id);
    res.json({ message: 'Problem deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting problem', error });
  }
});

// Server
const port = process.env.PORT || 4001; // BURADA PORT TƏYİN EDİLİR
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
