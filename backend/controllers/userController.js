const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// Sign up new user
exports.signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorResponse("All fields are required", 400));
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return next(new ErrorResponse("E-mail already registered", 400));
        }

        const user = await User.create({ firstName, lastName, email, password });
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error); // Log error for debugging
        next(error);
    }
}

// Sign in user
exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email) {
            return next(new ErrorResponse("Please add an email", 400));
        }
        if (!password) {
            return next(new ErrorResponse("Please add a password", 400));
        }

        // Check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        // Check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid credentials", 400));
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error(error); // Log error for debugging
        next(error);
    }
}

// Send token response
const sendTokenResponse = (user, codeStatus, res) => {
    const token = user.getJwtToken();
    res
        .status(codeStatus)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            role: user.role
        });
}

// Log out user
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    });
}

// Get user profile
exports.userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error); // Log error for debugging
        next(error);
    }
}

// Get all users
exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        next(error);
    }
};

// Get a single user by ID
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// Edit user details by ID
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        next(error);
    }
};

// Create or update user job history
exports.createUserJobsHistory = async (req, res, next) => {
    try {
        const { title, description, salary, location, interviewDate, applicationStatus } = req.body;
        const jobHistory = await User.findByIdAndUpdate(
            req.user.id,
            { $push: { jobsHistory: { title, description, salary, location, interviewDate, applicationStatus } } },
            { new: true }
        );
        res.status(200).json({ success: true, jobHistory });
    } catch (error) {
        next(error);
    }
};

// Add any other user-related functions as needed...
