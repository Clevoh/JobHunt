//userRoutes.js
const express = require('express');
const router = express.Router();
const {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
  createUserJobsHistory,
  signup,
  signin,
  userProfile
} = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// User routes

// Sign up a new user
router.post('/signup', signup);

// Sign in an existing user
router.post('/signin', signin);

// Get user profile (Authenticated user)
router.get('/profile', isAuthenticated, userProfile);

// Get all users (Admin only)
router.get('/allusers', isAuthenticated, isAdmin, allUsers);

// Get a single user by ID
router.get('/user/:id', isAuthenticated, singleUser);

// Edit user details by ID
router.put('/user/edit/:id', isAuthenticated, editUser);

// Delete a user by ID (Admin only)
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);

// Create or update user job history
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

module.exports = router;


// Sign out a user
router.post('/signout', isAuthenticated, (req, res) => {
  // Destroy the session if using sessions
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: 'Error signing out' });
    }
    res.clearCookie('sessionId'); // Clear session cookie if using sessions
    return res.status(200).send({ message: 'Signed out successfully' });
  });
  
  // If using JWT-based authentication, you could just return success without session handling
  // res.status(200).send({ message: 'Signed out successfully' });
});
