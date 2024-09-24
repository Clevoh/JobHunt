const Job = require('../models/jobModel');
const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

// Create job
exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            job
        });
    } catch (error) {
        next(new ErrorResponse('Error creating job', 500));
    }
};

// Get a single job by ID
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(new ErrorResponse('Error fetching job', 500));
    }
};

// Update job by ID
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
            .populate('jobType', 'jobTypeName')
            .populate('user', 'firstName lastName');

        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(new ErrorResponse('Error updating job', 500));
    }
};

// Show all jobs with filtering, search, and pagination
exports.showJobs = async (req, res, next) => {
    try {
        // Search by keyword in title
        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        // Filter by job type category (IDs)
        const jobTypeIds = req.query.cat
            ? [req.query.cat]
            : (await JobType.find({}, { _id: 1 })).map((cat) => cat._id);

        // Filter by location (unique locations)
        const allLocations = await Job.find({}, { location: 1 });
        const uniqueLocations = [...new Set(allLocations.map((val) => val.location))];
        const locationFilter = req.query.location || uniqueLocations;

        // Pagination setup
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;
        const count = await Job.find({ ...keyword, jobType: jobTypeIds, location: locationFilter }).countDocuments();

        // Fetch paginated and filtered jobs
        const jobs = await Job.find({ ...keyword, jobType: jobTypeIds, location: locationFilter })
            .sort({ createdAt: -1 })
            .populate('jobType', 'jobTypeName')
            .populate('user', 'firstName')
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            locations: uniqueLocations,
        });
    } catch (error) {
        next(new ErrorResponse('Error fetching jobs', 500));
    }
};
