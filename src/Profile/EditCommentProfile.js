import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Photo from '../OtherComponents/Photo';

const EditCommentProfile = ({ userId,author }) => {
  const handleSubmit = () => {
    // Handle form submission here
  };
  const[avatarUrl,setAvatarURL] = useState(null);
    
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

  return (
    <Card variant="outlined" sx={{mb:1,backgroundColor:"#FBFEFF"}}>
      <CardContent>
        
        <Grid container spacing={2} alignItems="center">
        <div style={{ display: 'flex', alignItems: 'center',marginLeft:15,marginTop:10 }}>
          <Avatar src={avatarUrl} alt={author} />
          
        </div>
          <Grid item xs={9}>
            <TextField label="Message" fullWidth />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
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
