import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Container, TextField, Button, Typography, Card, CardContent } from '@mui/material';

function App() {
  const [problems, setProblems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://localhost:4001/problems');
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  const addProblem = async () => {
    const newProblem = { title, description };
    await axios.post('http://localhost:4001/problems', newProblem);
    fetchProblems();
    setTitle('');
    setDescription('');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Problem Solver Platform
      </Typography>
      <div>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addProblem}>
          Add Problem
        </Button>
      </div>
      <div>
        {problems.map((problem) => (
          <Card key={problem._id} style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h5">{problem.title}</Typography>
              <Typography variant="body2">{problem.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default App;
