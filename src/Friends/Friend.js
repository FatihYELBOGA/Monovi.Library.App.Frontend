import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Photo from '../OtherComponents/Photo';
export default function Friend(props) {
  const { friend } = props;
  console.log(friend);
  return (
    <Link to={`/user-details/${friend.id}`} style={{ textDecoration: 'none',height:"auto" }}>
    <Card
  sx={{
    borderRadius: 2,
    borderRadius: 2, width: "20%", minWidth:"250px", backgroundColor: "#fbfdfd",
    ml: 2,
    marginBottom:3,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity (0.7 in this case)
    transition: 'transform 0.3s ease-in-out', // Add a smooth transition for scaling
    '&:hover': {
      transform: 'scale(1.1)', // Increase the size on hover
    },
  }}
>
  
  <CardContent sx={{ display:"flex" }}>
    {/* Card content goes here */}
 
    <Avatar src={Photo(friend.profil.content,friend.profil.name)} sx={{ width: 50, height: 50}}  />
 
  <div style={{display:"flex",justifyContent:"center",marginLeft:"15px",marginTop:"10px"}}>
  <Typography color="black"  gutterBottom variant="h7" component="div">
      {friend.firstName+ " "+friend.lastName}
    </Typography>
  </div>
  
  
  </CardContent>

</Card>
</Link>
 
    
  );
}

/*   <Link>
    <Card sx={{ display:"flex",borderRadius: 2, width: "20%", minWidth:"250px", backgroundColor: "#fbfdfd" }}>
      
      
      <CardHeader
      sx={{display:"flex",justifyContent:"center"}}
        avatar={
          <Avatar sx={{width:50,height:50}} />
        } 
      />
      <CardContent>
      <Typography variant="h6" sx={{textDecoration:"none"}}>
           Osman Altunay
          </Typography>      
      </CardContent>
    
    </Card>
    
    </Link>*/