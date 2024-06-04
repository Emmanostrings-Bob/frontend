import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Lost and Found
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/report-lost">Report Lost</Button>
                <Button color="inherit" component={Link} to="/report-found">Report Found</Button>
                <Button color="inherit" component={Link} to="/search">Search</Button>
                <IconButton color="inherit" component={Link} to="/notifications">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
