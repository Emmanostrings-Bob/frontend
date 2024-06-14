

import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useAppContext } from '../Context';

const ReportFoundItem = () => {
  const { reportFoundItem, user } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    reportFoundItem({ title, description, username: user?.username || 'Anonymous' });
    setTitle('');
    setDescription('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Report Found Item</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ReportFoundItem;

