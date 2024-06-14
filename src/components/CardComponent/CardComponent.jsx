
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useAppContext } from '../Context';

const CardComponent = ({ item, onAction, actionLabel }) => {
  const { addComment, user } = useAppContext();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(item.comments || []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = { text: comment, username: user?.username || 'Anonymous' };
    await addComment(item, newComment);
    setComments([...comments, newComment]); 
    setComment('');
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{item.title}</Typography>
        <Typography>{item.description}</Typography>
        <Typography variant="body2">Reported by: {item.username}</Typography>
        <Button onClick={() => onAction(item)}>{actionLabel}</Button>
        <form onSubmit={handleCommentSubmit}>
          <TextField
            label="Comment"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
        {comments.map((comment, index) => (
          <Typography key={index} variant="body2">
            <strong>{comment.username}:</strong> {comment.text}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
