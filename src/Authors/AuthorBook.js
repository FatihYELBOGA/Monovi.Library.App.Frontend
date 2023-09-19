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
    <Card sx={{ borderRadius: 2,width:"12% !important", minWidth: 200,height:300 ,ml:2, backgroundColor:"#fbfdfd"}}>
      <CardMedia
        sx={{ height: 180,width:"70%" ,marginLeft:"15%",marginTop:3}}
        image={photoUrl}
        title={book.name}
      />
      <CardContent>
        <div style={{height:10}}>
        <Typography sx={{display:"flex",justifyContent:"center",fontWeight:"bold"}} gutterBottom variant="h7" component="div">
          {book.name}
        </Typography>
        </div>

      </CardContent>
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <StarRating rating={4.2}  ></StarRating> 
        <Button onClick={()=>navigate("/book-details/"+book.id)} size="small" sx={{fontSize:"12px"}}>Learn More</Button>
      </CardActions>
    </Card>
  );
}