// AuthorPage.js
import React, { useState,useEffect } from 'react';
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
import Photo from '../OtherComponents/Photo';
import AuthorBook from './AuthorBook';

// Import author data or fetch it from an API


const AuthorDetails = () => {
  const { authorId } = useParams();
  const [author,setAuthor] = useState(null);
  const [isLoaded,setIsLoaded] = useState(false);
  const [books,setBooks] = useState([]);
  const [authorPhotoUrl,setAuthorPhotoUrl] = useState(null);
  // You can fetch author data dynamically based on the authorId if needed
  useEffect(()=>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/writers/"+authorId)
    .then((res) => {
        if (res.status === 204) {
          // Handle 204 No Content response
          return Promise.resolve(null);
        } else {
          return res.json();
        }
      })
    .then(
        (result) => {
            setIsLoaded(true);
            setAuthor(result);
            console.log(result.profil);
            if(result.profil != null){
                setAuthorPhotoUrl(Photo(result.profil.content,result.profil.name))
                
            }
            setBooks(result.books);
           
        },
        (error) => {
            setIsLoaded(true);   
        }
    )

  },[authorId])
  // Mock author data for this example
  if(author !== null){
    return (
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="auto"
                  image={authorPhotoUrl}
                  alt={author.lastName}
                />
                <CardContent>
                  <Typography variant="h6">{author.lastName}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>
                Biography
              </Typography>
              <Typography variant="body1">{author.biography}</Typography>
            </Grid>
          </Grid>
        </Paper>
  
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Books by 
        </Typography>
        <hr></hr>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '-20px' }}>
          {books.map((book) => (
            <React.Fragment key={book.id}>
              <ListItem sx={{ flexBasis: 'calc(33.33% - 10px)', display: 'flex', justifyContent: 'center', margin: '0 5px 20px' }} disableGutters>
                <AuthorBook book={book} />
              </ListItem>
            </React.Fragment>
          ))}
        </div>
      </Paper>
      </Container>
    );

  }else{
    return (
      <div>

      </div>
    )
  }

  
};

export default AuthorDetails;
