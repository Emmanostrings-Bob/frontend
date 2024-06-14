import React, { useState } from 'react';
import { Container, Typography, TextField } from '@mui/material';
import { useAppContext } from '../Context';
import CardComponent from '../CardComponent/CardComponent';

const Home = () => {
  const { lostItems, foundItems, claimItem, markItemFound } = useAppContext();
  const [query, setQuery] = useState('');

  const filteredLostItems = lostItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  const filteredFoundItems = foundItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Home</Typography>
      <TextField
        label="Search"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        margin="normal"
      />

      <Typography variant="h5" gutterBottom>Lost Items</Typography>
      {filteredLostItems.map((item, index) => (
        <CardComponent
          key={index}
          item={item}
          onAction={markItemFound}
          actionLabel="Found?"
        />
      ))}

      <Typography variant="h5" gutterBottom>Found Items</Typography>
      {filteredFoundItems.map((item, index) => (
        <CardComponent
          key={index}
          item={item}
          onAction={claimItem}
          actionLabel="Claim"
        />
      ))}
    </Container>
  );
};

export default Home;

