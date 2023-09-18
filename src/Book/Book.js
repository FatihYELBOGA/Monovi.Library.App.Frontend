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

export default function Book(props) {
    const{book} = props;
    const navigate = useNavigate();
    const [photoUrl,setPhotoUrl] = useState(null);
    useEffect(() =>{
      if(book.photo !== null){
        setPhotoUrl(Photo(book.photo.content,book.photo.name));
      }
    },[])
    
  return (
    <Card sx={{ borderRadius: 2,width:"12% !important", minWidth: 300,height:500 ,ml:2, mt:15,backgroundColor:"#fbfdfd"}}>
      <CardMedia
        sx={{ height: 300,width:"60%" ,marginLeft:"20%",marginTop:3}}
        image={photoUrl}
        title={book.name}
      />
      <CardContent>
        <div style={{height:80}}>
        <Typography sx={{display:"flex",justifyContent:"center",fontWeight:"bold"}} gutterBottom variant="h7" component="div">
          {book.name}
        </Typography>
        <Typography sx={{display:"flex",justifyContent:"center"}} variant="body2" color="text.secondary">
          {book.writer.firstName}  {book.writer.lastName}
        </Typography>
        </div>

      </CardContent>
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <StarRating rating={4.2}></StarRating> 
        <Button onClick={()=>navigate("/book-details/"+book.id)} size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}