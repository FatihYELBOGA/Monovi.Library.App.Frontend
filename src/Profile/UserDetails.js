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
  ListItem,
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
  const [status,setStatus] = useState("");
  const [books, setBooks] = useState([]);
  const [avatarUrl,setAvatarURL] = useState("");
  const [isWaitingForFriend,setIsWaitingForFriend] = useState(false);
  const [isMe,setIsMe] = useState(userId === friendId);
  const [friendshipId,setFriendshipId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const itemsPerPage = 3; // Number of authors to display per page
  

  useEffect(() => 
  { 
    console.log(userId);
    fetch(" http://fatihyelbogaa-001-site1.htempurl.com/friends?user1="+friendId+"&user2="+userId).
    then((res) => {
      if (res.status === 204) {
        return Promise.resolve([]);
      } else {
        return res.json();
      }
    }).
    then((result) => {
      console.log(result)
      if(result.status ==="WAITING"){
        setIsWaitingForFriend(true);
        
      }
      setFriendshipId(result.id)
    },
    (error) => {
      console.log(error);
    });
  }, [friendId,userId]);
  
  
  
  useEffect(() => 
  { 
    console.log(userId);
    fetch(" http://fatihyelbogaa-001-site1.htempurl.com/friends?user1="+userId+"&user2="+friendId).
    then((res) => {
      if (res.status === 204) {
        setStatus("NONE");
        return Promise.resolve("");
      } else {
        return res.json();
      }
    }).
    then((result) => {
      if(result !== ""){
        setStatus(result.status);
        setFriendshipId(result.id);
      }
       

      
    },
    (error) => {
      console.log(error);
    });
  }, [friendId,userId]);


  useEffect(() => 
  { 
    console.log(userId);
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/users/"+friendId).
    then((res) => {
      if (res.status === 204) {
        return Promise.resolve([]);
      } else {
        return res.json();
      }
    }).
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

  useEffect(() => {
      fetch(`http://fatihyelbogaa-001-site1.htempurl.com/books/users/${friendId}?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
        .then((res) => {
          if (res.status === 204) {
            return Promise.resolve([]);
          } else {
            return res.json();
          }
        })
        .then(
          (result) => {
            setIsLoaded(true);
            setBooks(result.content);
            setTotalPage(result.totalPages);
            // Initialize filteredAuthors with all authors
          },
          (error) => {
            setIsLoaded(true);
          }
        );
    }, [currentPage]);

    

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };



  const handleAddFriend = ()=>{
    

    fetch("http://fatihyelbogaa-001-site1.htempurl.com/friends?user1="+userId+"&user2="+friendId, {
      method: "POST",
    })
    .then((res) => {
      if (res.status === 204) {
        return Promise.resolve([]);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      alert("Request was sent!");
      setStatus("WAITING");
    })
    .catch((err) => console.log(err));
  
    

  }

  const handleRejectedFriend = ()=>{
    const formData = new FormData();
    formData.append("requestStatus","DENIED");
    fetch(`http://fatihyelbogaa-001-site1.htempurl.com/friends/`+friendshipId,{
      method:"PUT",
      body: formData,
    })
      .then((res) => {
        if (res.status === 204) {
          return Promise.resolve([]);
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          console.log(result);
          alert("Rejected!");
          setIsWaitingForFriend(false);
          setStatus("DENIED");
        },
        (error) => {
          console.log(error)
        }
      );
  };


  const handleAcceptFriend = () =>{
    const formData = new FormData();
    formData.append("requestStatus","APPROVED");
    fetch(`http://fatihyelbogaa-001-site1.htempurl.com/friends/`+friendshipId,{
      method:"PUT",
      body: formData,
    })
      .then((res) => {
        if (res.status === 204) {
          return Promise.resolve([]);
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          console.log(result);
          alert("Acccepted!")
          setIsWaitingForFriend(false);
          setStatus("APPROVED");
        },
        (error) => {
          console.log(error)
        }
      );

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
              {(isMe) ? (<div></div>) : ((isWaitingForFriend) ? 
              (
                <div className="button-container">
                  <button className="accept-button"
                  onClick={handleAcceptFriend}>Accept</button>
                  <button className="reject-button"
                  onClick={handleRejectedFriend}>Reject</button>
                </div>

              ) : ( (status === "NONE" || status === "DENIED") ? (<Button 
              onClick={handleAddFriend}>
                <PersonAddIcon></PersonAddIcon>
                </Button>) : ((status === "WAITING") ? (
                    <div className="waiting-container">
                      WAITING
                      </div>
                ) : (
                  <div className="friend-button-container">
                    
                    <button className="withdraw-button"
                    onClick={handleRejectedFriend}
                    >
                      Withdraw
                    </button>
                  </div>
                ))

              ))}
              
              </div>
              <div style={{marginTop:50}}>
              <Typography style={{fontSize:"18px"}} variant="body1"><b>E-mail:</b> {user.email}</Typography>
              <Typography style={{fontSize:"18px"}} variant="body1"><b>First Name:</b> {user.firstName}</Typography>
              <Typography style={{fontSize:"18px"}} variant="body1"><b>Last Name:</b> {user.lastName.toUpperCase()}</Typography>
              
              <Typography style={{fontSize:"18px"}} variant="body1"><b>Born Date:</b> {(user.bornDate !== null) ? (user.bornDate.split("T")[0]) :("kmfa")}</Typography>
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
        <div style={{ textAlign: 'center', marginTop: 20 }}>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? 'active' : ''
            }`}
          >
            {index + 1}
          </button>
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
