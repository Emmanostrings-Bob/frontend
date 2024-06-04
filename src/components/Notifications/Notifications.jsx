import { Container, Typography, Paper } from '@mui/material';
import {useAppContext} from '../Context'

const Notifications = () => {
  const { notifications } = useAppContext();

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Notifications</Typography>
      {notifications.map((notification, index) => (
        <Paper key={index} style={{ padding: '10px', marginBottom: '10px' }}>
          <Typography>{notification}</Typography>
        </Paper>
      ))}
    </Container>
  );
};

export default Notifications;
