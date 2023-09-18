// AuthorPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';

// Import author data or fetch it from an API
const authorData = {
  id: 1,
  name: 'John Doe',
  bio: 'John Doe is a renowned author with several bestsellers to his name. He was born in...',
  photoUrl: 'john-doe.jpg', // Replace with the actual URL of the author's photo
  books: [
    { id: 1, title: 'Book 1', year: 2020 },
    { id: 2, title: 'Book 2', year: 2018 },
    // Add more books here
  ],
};

const AuthorDetails = () => {
  const { authorId } = useParams();
  // You can fetch author data dynamically based on the authorId if needed

  // Mock author data for this example
  const author = authorData;

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                component="img"
                height="auto"
                image={author.photoUrl}
                alt={author.name}
              />
              <CardContent>
                <Typography variant="h6">{author.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              Biography
            </Typography>
            <Typography variant="body1">{author.bio}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Books by {author.name}
        </Typography>
        <List>
          {author.books.map((book) => (
            <React.Fragment key={book.id}>
              <ListItem disableGutters>
                <Avatar sx={{ width: 60, height: 60 }}>
                  {/* You can add book cover images here */}
                </Avatar>
                <ListItemText
                  primary={book.title}
                  secondary={`Published in ${book.year}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AuthorDetails;
