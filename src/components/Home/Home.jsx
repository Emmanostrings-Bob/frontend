import React from 'react';
import { Container, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useAppContext } from '../../Context/Context';

const Home = () => {
  const { lostItems, foundItems, claimItem, markItemFound } = useAppContext();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Home</Typography>
      
      <Typography variant="h5" gutterBottom>Lost Items</Typography>
      {lostItems.map((item, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography>{item.description}</Typography>
            <Typography variant="body2">Reported by: {item.username}</Typography>
            <Button onClick={() => markItemFound(item)}>Found?</Button>
            <TextField label="Comment" fullWidth margin="normal" />
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" gutterBottom>Found Items</Typography>
      {foundItems.map((item, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography>{item.description}</Typography>
            <Typography variant="body2">Reported by: {item.username}</Typography>
            <Button onClick={() => claimItem(item)}>Claim</Button>
            <TextField label="Comment" fullWidth margin="normal" />
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Home;
