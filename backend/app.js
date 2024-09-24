const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoutes = require('./routes/jobsTypeRoutes');
const jobRoutes = require('./routes/jobsRoutes'); // Ensure correct naming

// Database connection
mongoose.connect(process.env.DATABASE)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Database connection error:", err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoutes);
app.use('/api', jobRoutes); // Ensure this is included

// Error middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
