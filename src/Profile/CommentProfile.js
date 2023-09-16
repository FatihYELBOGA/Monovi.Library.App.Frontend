import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const CommentProfile = ({ author, text, avatarUrl }) => {
  return (
    <Card variant="outlined" sx={{backgroundColor:"#FBFEFF"}}>
      <CardContent>
        

        <Grid container spacing={2} alignItems="center">
        <div style={{ display: 'flex', alignItems: 'center',marginLeft:15,marginTop:10 }}>
          <Avatar src={avatarUrl} alt={author} />
             
        </div>
          <Grid item xs={9}>
          <Typography variant="h7" style={{ marginLeft: '',fontFamily:"Verda",fontWeight:"bold" }}>
            Fatih Yelboğa
          </Typography>
        <Typography variant="body1" style={{ marginTop: '' }}>
          Kendimi buraya ait hissediyorum
        </Typography>
          </Grid>
          
        </Grid>
       
      </CardContent>
    </Card>
  );
};

export default CommentProfile;
