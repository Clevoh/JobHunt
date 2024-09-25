import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/actions/userActions'; // Adjust the path as needed

const EditProfile = () => {
    const { user } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();
    
    // Initialize state with user data
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        location: user.profile?.location || '',
        bio: user.profile?.bio || '',
        skills: user.skills || [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the action to update the user profile
        dispatch(updateUserProfile(formData));
    };

    return (
        <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
            <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                Edit Profile
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Skills (comma-separated)"
                    name="skills"
                    value={formData.skills.join(', ')} // Assuming skills are an array of names
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
            </form>
        </Box>
    );
}

export default EditProfile;
