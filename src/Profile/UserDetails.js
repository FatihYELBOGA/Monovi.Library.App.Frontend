// UserDetails.js
import React, { useState, useEffect } from 'react';
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
  Button,
} from '@mui/material';
import Photo from '../OtherComponents/Photo';
import AuthorBook from '../Authors/AuthorBook';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const UserDetails = (props) => {
  const {userId} = props;
  const { friendId } = useParams(); // Assuming you have a userId parameter in your route
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userPhotoUrl, setUserPhotoUrl] = useState(null);
  const [books, setBooks] = useState([]);
  const [avatarUrl,setAvatarURL] = useState("");
  const [friendSituation,setFriendSituation] = useState("");

  http://fatihyelbogaa-001-site1.htempurl.com/friends?user1=1&user2=2


  useEffect(() => 
  { 
    console.log(userId);
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/users/"+friendId).
    then((res) =>
      res.json()).
    then((result) => {
      
      setUser(result);
      if(result.profil !=null ){
        setAvatarURL(Photo(result.profil.content,result.profil.name))
       
      }
    },
    (error) => {
      console.log(error);
    });
  }, [friendId]);

  

  useEffect(() => 
  { 
    console.log(userId);
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/books/users/"+friendId).
    then((res) =>
      res.json()).
    then((result) => {
      
      setBooks(result);
      
    },
    (error) => {
      console.log(error);
    });
  }, [userId]);

  if (user !== null) {
    return (
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="auto"
                  image={userPhotoUrl}
                  alt={user.name}
                />
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <Typography variant="h4" gutterBottom>
                User Information
              </Typography>
              <Button>
              <PersonAddIcon></PersonAddIcon>
              </Button>
              


              </div>
             
              <Typography variant="body1">First Name: {user.firstName}</Typography>
              <Typography variant="body1">Last Name: {user.lastName}</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
              <Typography variant="body1">Age: {user.age}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Books by {user.name}
          </Typography>
          <div>
            {books.map((book) => (
              <React.Fragment key={book.id}>
                <ListItem sx={{display:"flex", justifyContent:"center"}} disableGutters>
                <AuthorBook book={book}/>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        </Paper>
      </Container>
    );
  } else {
    return (
      <div>
        asdasds
      </div>
    );
  }
};

export default UserDetails;
