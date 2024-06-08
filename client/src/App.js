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
      const response = await axios.get('http://localhost:4001/api/problems');
      setProblems(response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  const addProblem = async () => {
    try {
      const newProblem = { title, description };
      const response = await axios.post('http://localhost:4001/api/problems', newProblem);
      setProblems([...problems, response.data]);
      setTitle('');
      setDescription('');
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

  const handleUpdateProblem = async (updatedProblem) => {
    try {
      const response = await axios.put(`http://localhost:4001/api/problems/${updatedProblem._id}`, updatedProblem);
      setProblems(problems.map(problem => problem._id === updatedProblem._id ? response.data : problem));
      handleClose();
    } catch (error) {
      console.error('Error updating problem:', error);
    }
  };

  const handleDeleteProblem = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/problems/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
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
            <Button variant="contained" color="secondary" onClick={() => handleDeleteProblem(problem._id)}>
              DELETE
            </Button>
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
          <Button onClick={() => handleUpdateProblem(selectedProblem)} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
