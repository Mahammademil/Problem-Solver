import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [problems, setProblems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProblems();
  }, []);

 const fetchProblems = async () => {
  try {
    const response = await axios.get('http://localhost:4000/problems');
    console.log("Fetched Problems: ", response.data); // Gələn məlumatları konsolda göstər
    setProblems(response.data);
  } catch (error) {
    console.error("Error fetching problems:", error);
  }
};


  const addProblem = async () => {
    try {
      const newProblem = { title, description };
      await axios.post('http://localhost:4000/problems', newProblem); // Portu 4000 olaraq dəyişdirin
      fetchProblems();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  return (
    <div className="App">
      <h1>Problem Solver Platform</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addProblem}>Add Problem</button>
      </div>
      <div>
        {problems.map((problem) => (
          <div key={problem._id}>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
