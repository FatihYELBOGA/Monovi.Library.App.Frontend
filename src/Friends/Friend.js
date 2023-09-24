import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
export default function Friend(props) {
  const { user } = props;

  return (
    <Link to={``} style={{ textDecoration: 'none',height:"auto" }}>
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
 
    <Avatar sx={{ width: 50, height: 50}}  />
 
  <div style={{display:"flex",justifyContent:"center",marginLeft:"15px",marginTop:"10px"}}>
  <Typography color="black"  gutterBottom variant="h7" component="div">
      Fydor Dostoyevski
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