import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MonoviLogo from '../image/monovi-logo.png';
import StarRating from '../OtherComponents/StarRating';
import { useNavigate } from 'react-router-dom';
import Photo from '../OtherComponents/Photo';
import { Link } from 'react-router-dom';

export default function AuthorBook(props) {
    const{book} = props;
    const navigate = useNavigate();
    const [photoUrl,setPhotoUrl] = useState(null);
    useEffect(() =>{
      if(book.photo !== null){
        setPhotoUrl(Photo(book.photo.content,book.photo.name));
      }
    },[])
    
  return (
    <Link to={`/book-details/${book.id}`} style={{ textDecoration: 'none' }}>
    <Card
  sx={{
    borderRadius: 2,
    width: "12% !important",
    minWidth: 200,
    height: 300,
    ml: 2,
    backgroundImage: `url("${photoUrl}")`,
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
  <CardContent sx={{ mt: 25 }}>
    {/* Card content goes here */}
  </CardContent>
  <CardActions sx={{ display:"block",height:80, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
  
  <div style={{display:"flex",justifyContent:"center"}}>
  <StarRating rating={4.2}></StarRating>
  </div>

  
  <div style={{display:"flex",justifyContent:"center"}}>
  <Typography color="white" sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
      {book.name}
    </Typography>
  </div>
  
  
  
</CardActions>
</Card>
</Link>

  );
}