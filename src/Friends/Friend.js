import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function FriendCard(props) {
  const { user } = props;

  return (
    <Card sx={{ borderRadius: 2, width: "100%", backgroundColor: "#fbfdfd" }}>
      <CardHeader
        avatar={
          <Avatar />
        }
        title={
          <Typography variant="h6">
           
          </Typography>
        }
        action={
          <IconButton aria-label="add-friend">
            <AddCircleOutlineIcon />
          </IconButton>
        }
      />
      <CardContent>
        {/* You can add additional user information or actions here */}
      </CardContent>
    </Card>
  );
}