import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Photo from '../OtherComponents/Photo';


const CommentProfile = (props) => {
  const {comment} = props;
  const [avatarUrl,setAvatarUrl] = useState(null);
  const [timeAgo,setTimeAgo] = useState(null);

  useEffect(()=>{
    if(comment.user.profil != null){
      setAvatarUrl(Photo(comment.user.profil.content,comment.user.profil.name))
    }

  },[comment])
  
    


  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date();
      const commentTime = new Date(comment.commentDate);
      const timeDifference = now - commentTime;
      
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      if (seconds < 60) {
        setTimeAgo(`${seconds} second${seconds !== 1 ? 's' : ''} ago`);
      } else if (minutes < 60) {
        setTimeAgo(`${minutes} min${minutes !== 1 ? 's' : ''} ago`);
      } else if (hours < 24) {
        setTimeAgo(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
      } else {
        setTimeAgo(`${days} day${days !== 1 ? 's' : ''} ago`);
      }
    };
    
    updateTimeAgo();
    const intervalId = setInterval(updateTimeAgo, 60000); // Update every minute

    return () => {
      clearInterval(intervalId);
    };
  }, [comment]);
  
  return (
    <Card variant="outlined" sx={{backgroundColor:"#fbfdfd",width:"100%",border:0}}>
      <CardContent>
        

        <Grid container spacing={2} alignItems="center">
        <div style={{ display: 'flex', alignItems: 'center',marginLeft:15,marginTop:10 }}>
          <Avatar src={avatarUrl} alt={comment.user.firstName} />
             
        </div>
          <Grid item xs={10.5}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Typography variant="h7" style={{ marginLeft: '',fontWeight:"bold",fontSize:"16px",marginBottom:1 }}>
            {comment.user.firstName + " "+ comment.user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginTop: '',fontSize:"12px" }}>
          {timeAgo}
        </Typography>

            </div>
          
        <Typography variant="body1"  style={{ marginTop: '',fontSize:"14px" }}>
          {comment.comment}
        </Typography>
          </Grid>
          
          
        </Grid>
       
      </CardContent>
    </Card>
  );
};

export default CommentProfile;
