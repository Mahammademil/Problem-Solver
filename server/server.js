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

// Server
const port = process.env.PORT || 4001; // BURADA PORT TƏYİN EDİLİR
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
