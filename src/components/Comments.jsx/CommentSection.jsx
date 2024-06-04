import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const CommentSection = ({ itemId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { id: comments.length + 1, content, itemId, username: 'User' };
    setComments([...comments, newComment]);
    setContent('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Comments</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Add a comment"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Comment
        </Button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Typography variant="subtitle1">{comment.username}</Typography>
          <Typography>{comment.content}</Typography>
        </div>
      ))}
    </Container>
  );
};

export default CommentSection;