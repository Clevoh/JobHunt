import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UserInfoDashboard = () => {
    const { user } = useSelector(state => state.userProfile);
    const { palette } = useTheme();

    return (
        <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
            <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
                        Personal Info
                    </Typography>
                    <hr style={{ marginBottom: "30px" }} />
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        First name: {user && user.firstName}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        Last name: {user && user.lastName}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        E-mail: {user && user.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5, color: "grey", pt: 2 }} color="text.secondary">
                        Status: {user && user.role === 0 ? "Regular user" : "Admin"}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        Location: {user && user.profile?.location}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        Bio: {user && user.profile?.bio}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        Skills: {user && user.skills?.map(skill => skill.name).join(', ')}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        Created At: {user && new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
                        Updated At: {user && new Date(user.updatedAt).toLocaleDateString()}
                    </Typography>
                    
                    {/* Edit Profile Button */}
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        component={Link} 
                        to="/profile/edit" // Adjust the path to your edit profile route
                        sx={{ mt: 2 }}
                    >
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UserInfoDashboard;
