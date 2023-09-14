import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MonoviLogo from '../image/monovi-logo.png';
import StarRating from '../OtherComponents/StarRating';
import { useNavigate } from 'react-router-dom';


export default function Book(props) {
    const{book} = props;
    const navigate = useNavigate();
   
  return (
    <Card sx={{ width:"20% !important", minWidth: 200 ,ml:10,mr:10, mt:15}}>
      <CardMedia
        sx={{ height: 200 }}
        image={MonoviLogo}
        title="green iguana"
      />
      <CardContent>
        <Typography sx={{display:"flex",justifyContent:"center"}} gutterBottom variant="h5" component="div">
          {book.name}
        </Typography>
        <Typography sx={{display:"flex",justifyContent:"center"}} variant="body2" color="text.secondary">
          {book.writer.firstName}  {book.writer.lastName}
        </Typography>

      </CardContent>
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
        <StarRating rating={4.2}></StarRating> 
        <Button onClick={()=>navigate("/book-details/"+book.id)} size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}