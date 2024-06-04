import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useAppContext } from '../Context';

const ReportLostItem = () => {
  const { reportLostItem } = useAppContext();
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
    reportLostItem(newItem);
    setDescription('');
    setLocation('');
    setDate('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Report Lost Item</Typography>
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
          Report Lost Item
        </Button>
      </form>
    </Container>
  );
};

export default ReportLostItem;