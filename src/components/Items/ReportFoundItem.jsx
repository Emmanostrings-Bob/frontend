import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

import { useAppContext } from '../Context';

const ReportFoundItem = () => {
  const { reportFoundItem } = useAppContext();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description,
      location,
      date,
      userId: 'user123', 
    };
    reportFoundItem(newItem);
    setDescription('');
    setLocation('');
    setDate('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Report Found Item</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Location"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Report Found Item
        </Button>
      </form>
    </Container>
  );
};

export default ReportFoundItem;