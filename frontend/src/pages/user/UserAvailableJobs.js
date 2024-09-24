import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserAvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('/api/jobs');
        setJobs(data.jobs);
        setLoading(false);
      } catch (error) {
        setError('Error fetching jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading available jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Available Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAvailableJobs;
