const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());

// CORS Konfiqurasiyası
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3005', 'http://localhost:3006'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

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
app.listen(4000, () => {
    console.log('Server running on port 4000');
});
