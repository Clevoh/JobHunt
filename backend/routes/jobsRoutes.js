const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Jobs Routes

// Route to create a job (admin only)
router.post('/job/create', isAuthenticated, isAdmin, createJob);

// Route to get a single job by its ID (public)
router.get('/job/:id', singleJob);

// Route to update a job by job ID (admin only)
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);

// Route to show all jobs (public)
router.get('/jobs', showJobs);

module.exports = router;
