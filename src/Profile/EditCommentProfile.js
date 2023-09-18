import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Photo from '../OtherComponents/Photo';

const EditCommentProfile = ({ userId,author,bookId,isNew,setIsNew }) => {
  const[avatarUrl,setAvatarURL] = useState(null);
  const [comment,setComment] = useState("");
    
    useEffect(() => 
    { 
      fetch("http://fatihyelbogaa-001-site1.htempurl.com/users/"+userId).
      then((res) =>
        res.json()).
      then((result) => {
        if(result.profil !=null ){
          setAvatarURL(Photo(result.profil.content, result.profil.name));
        }
      },
      (error) => {
        console.log(error);
      });
    }, [userId]);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(bookId,userId,comment)
      const formData = new FormData();
      formData.append("BookId",bookId);
      formData.append("UserId",userId);
      formData.append("Comment",comment);
      fetch('http://fatihyelbogaa-001-site1.htempurl.com/comments', {
        method: 'POST',
        body: formData,
        headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include the token in the "Authorization" header.
          // You may need to add other headers based on the API requirements.
        }
      })
        .then((res) => res.json())
        .then((res) => {
            setIsNew(!isNew);
            console.log(res);
            alert(res.message);
            setComment("");
          
        })
        .catch((err) => console.log(err));
    };

  return (
    <Card variant="outlined" sx={{mb:1,backgroundColor:"#fbfdfd",marginBottom:1,mt:2,border:0}}>
      <CardContent>
        
        <Grid container spacing={2} alignItems="center">
        <div style={{ display: 'flex', alignItems: 'center',marginLeft:15,marginTop:13 }}>
          <Avatar src={avatarUrl} alt={author} />
          
        </div>
          <Grid item xs={9}>
            <input 
            label="Message"
            placeholder='Write comment...'
            value={comment}
            style={{height:"32px",width:"100%",border:"0.1px solid",borderRadius:5}}
            onChange={(e)=>setComment(e.target.value)}
            fullWidth />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{height:38,width:"100px",border: 0,borderRadius:3,backgroundColor:"#E50000"}}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EditCommentProfile;
