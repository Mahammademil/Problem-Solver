import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function App() {
  const [problems, setProblems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://localhost:4001/problems');
      setProblems(response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  const addProblem = async () => {
    try {
      const newProblem = { title, description };
      await axios.post('http://localhost:4001/problems', newProblem);
      setTitle('');
      setDescription('');
      fetchProblems();
    } catch (error) {
      console.error('Error adding problem:', error);
    }
  };

  const handleClickOpen = (problem) => {
    setSelectedProblem(problem);
  };

  const handleClose = () => {
    setSelectedProblem(null);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Problem Solver Platform
      </Typography>
      <Paper className="problem-form" elevation={3}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="problem-input"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="problem-input"
        />
        <Button variant="contained" color="primary" onClick={addProblem}>
          ADD PROBLEM
        </Button>
      </Paper>
      <div>
        {problems.map((problem) => (
          <Paper key={problem._id} className="problem-item" onClick={() => handleClickOpen(problem)}>
            <Typography variant="h6">{problem.title}</Typography>
            <Typography>{problem.description}</Typography>
          </Paper>
        ))}
      </div>
      <Dialog open={Boolean(selectedProblem)} onClose={handleClose}>
        <DialogTitle>Problem Details</DialogTitle>
        {selectedProblem && (
          <DialogContent>
            <DialogContentText>Title: {selectedProblem.title}</DialogContentText>
            <DialogContentText>Description: {selectedProblem.description}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
