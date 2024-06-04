import React, { useState } from 'react';
import { Container, TextField, Grid, Card, CardContent, Typography } from '@mui/material';

const SearchItems = () => {
  const [query, setQuery] = useState('');

  const mockLostItems = [
    { id: 1, description: 'Lost Wallet', location: 'Library', date: '2024-05-25' },
    { id: 2, description: 'Lost Phone', location: 'Cafeteria', date: '2024-05-24' },
  ];

  const mockFoundItems = [
    { id: 1, description: 'Found Key', location: 'Gym', date: '2024-05-25' },
    { id: 2, description: 'Found Book', location: 'Classroom', date: '2024-05-24' },
  ];

  const filteredLostItems = mockLostItems.filter(item => 
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.location.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFoundItems = mockFoundItems.filter(item => 
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search Items"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        margin="normal"
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Lost Items</Typography>
        </Grid>
        {filteredLostItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.description}</Typography>
                <Typography>{item.location}</Typography>
                <Typography>{item.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Found Items</Typography>
        </Grid>
        {filteredFoundItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.description}</Typography>
                <Typography>{item.location}</Typography>
                <Typography>{item.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchItems;
