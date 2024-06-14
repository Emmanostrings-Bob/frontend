

import React from 'react';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppContext } from '../Context';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const { notifications } = useAppContext();
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Notifications</Typography>
      <List>
        {notifications.map((notification, index) => (
          <ListItem button key={index} onClick={() => handleNotificationClick(notification)}>
            <ListItemText primary={notification.message} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Notifications;

