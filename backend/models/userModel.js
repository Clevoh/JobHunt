const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Job history schema for users
const jobsHistorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

// User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'E-mail is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must have at least (6) characters'],
    },
    jobsHistory: [jobsHistorySchema],
    role: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

// Encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Call next if password is not modified
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error); // Pass error to the next middleware
    }
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
    });
};

module.exports = mongoose.model("User", userSchema);
