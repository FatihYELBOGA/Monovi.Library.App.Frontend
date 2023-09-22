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
import './UserDetails.css'

const UserDetails = (props) => {
  const {userId} = props;
  const { friendId } = useParams(); // Assuming you have a userId parameter in your route
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userPhotoUrl, setUserPhotoUrl] = useState(null);
  const [status,setStatus] = useState("");
  const [books, setBooks] = useState([]);
  const [avatarUrl,setAvatarURL] = useState("");
  const [isWaitingForFriend,setIsWaitingForFriend] = useState(false);

  http://fatihyelbogaa-001-site1.htempurl.com/friends?user1=1&user2=2

  useEffect(() => 
  { 
    console.log(userId);
    fetch(" http://fatihyelbogaa-001-site1.htempurl.com/friends?user1="+friendId+"&user2="+userId).
    then((res) =>
      res.json()).
    then((result) => {
      
      if(result ==="WAITING"){
        setIsWaitingForFriend(true);
      }
    },
    (error) => {
      console.log(error);
    });
  }, [friendId,userId]);
  
  
  
  useEffect(() => 
  { 
    console.log(userId);
    fetch(" http://fatihyelbogaa-001-site1.htempurl.com/friends?user1="+userId+"&user2="+friendId).
    then((res) =>
      res.json()).
    then((result) => {
      
      setStatus(result);
    },
    (error) => {
      console.log(error);
    });
  }, [friendId,userId]);


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


  const handleAddFriend = ()=>{
    

    fetch("http://fatihyelbogaa-001-site1.htempurl.com/friends?user1="+userId+"&user2="+friendId, {
      method: "POST",
    })
    .then((res) => res.json()) 
    .then((data) => {
      alert("Request was sent!");
      setStatus("WAITING");
    })
    .catch((err) => console.log(err));
  
    

  }

  const handleRejectedFriend = ()=>{


  }

  const handleAcceptFriend = () =>{

  }


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
                  image={avatarUrl}
                  alt={user.firstName}
                />
                
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <Typography variant="h4" sx={{fontWeight:"bold"}} gutterBottom>
                {user.firstName+" "+user.lastName.toUpperCase()}
              </Typography>
              {(isWaitingForFriend) ? 
              (
                <div className="button-container">
                  <Button className="accept-button"
                  onClick={handleAcceptFriend}>Accept</Button>
                  <Button className="reject-button"
                  onClick={handleRejectedFriend}>Reject</Button>
                </div>

              ) : ( (status !== "NONE") ? (<Button 
              onClick={handleAddFriend}>
                <PersonAddIcon></PersonAddIcon>
                </Button>) : ((status !== "WAITING") ? (
                    <div className="waiting-container">
                      WAITING
                      </div>
                ) : (
                  <div className="friend-button-container">
                    
                    <Button className="withdraw-button"
                    onClick={handleRejectedFriend}
                    >
                      Withdraw
                    </Button>
                  </div>
                ))

              )}
              
              </div>
              <div style={{marginTop:50}}>
              <Typography style={{fontSize:"18px"}} variant="body1"><b>E-mail:</b> {user.email}</Typography>
              <Typography style={{fontSize:"18px"}} variant="body1"><b>First Name:</b> {user.firstName}</Typography>
              <Typography style={{fontSize:"18px"}} variant="body1"><b>Last Name:</b> {user.lastName.toUpperCase()}</Typography>
              
              <Typography style={{fontSize:"18px"}} variant="body1"><b>Born Date:</b> {user.bornDate.split("T")[0]}</Typography>
                </div>           
              
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Created by
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
  } else {
    return (
      <div>
        asdasds
      </div>
    );
  }
};

export default UserDetails;
