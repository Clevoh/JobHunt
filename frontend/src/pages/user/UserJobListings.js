//UserjobListings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserJobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch job listings from the backend
    axios.get('/api/jobs')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching job listings:', error);
      });
  }, []);

  return (
    <div>
      <h1>Available Jobs</h1>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <button>Apply</button> {/* You can handle application logic here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserJobListings;
