import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarRating from '../OtherComponents/StarRating';
import { useNavigate } from 'react-router-dom';
import Photo from '../OtherComponents/Photo';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Book(props) {
    const{book,role,setBookRender,bookRender} = props;
    const navigate = useNavigate();
    const [photoUrl,setPhotoUrl] = useState(null);


    useEffect(() =>{
      if(book.photo !== null){
        setPhotoUrl(Photo(book.photo.content,book.photo.name));
      }
    },[])
    const handleDeleteBook = () =>{
      fetch(`http://fatihyelbogaa-001-site1.htempurl.com/books/`+book.id, {
    method: 'DELETE',
  })
    .then((result) =>{
      console.log(result);
      alert("Deleted!")
      setBookRender(!bookRender);
    });
      
      
    }
    
  return (
    <div>
    {(role !== "ADMIN") ?(
      <Link to={`/book-details/${book.id}`} style={{ textDecoration: 'none',height:"auto" }}>
      <Card
    sx={{
      borderRadius: 2,
      width: "12% !important",
      minWidth: 250,
      height: 400,
      ml: 2,
      marginBottom:3,
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
    <CardContent sx={{ mt: 34 }}>
      {/* Card content goes here */}
    </CardContent>
    <CardActions sx={{ display:"block",height:80, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
    
    <div style={{display:"flex",justifyContent:"center"}}>
    <StarRating rating={4.2}></StarRating>
    </div>
    <div style={{display:"flex",justifyContent:"center"}}>
    <Typography color="white" sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
        Fydor Dostoyevski
      </Typography>
    </div>
    
    <div style={{display:"flex",justifyContent:"center"}}>
    <Typography color="white" sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
        {book.name}
      </Typography>
    </div>
    
    
    
  </CardActions>
  </Card>
  </Link>

    ) : (
    <Card
  sx={{
    borderRadius: 2,
    width: "12% !important",
    minWidth: 250,
    height: 400,
    ml: 2,
    marginBottom:3,
    backgroundImage: `url("${photoUrl}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity (0.7 in this case)
   
  }}
>
<Button
      onClick={handleDeleteBook}
      sx={{color:"black",justifyContent:"right",marginLeft:"70%"}}>
      
      
      <DeleteIcon/>
      </Button>
  <CardContent sx={{ mt: 34 }}>
    {/* Card content goes here */}
  </CardContent>
  <CardActions sx={{ display:"block",height:80, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
  
  <div style={{display:"flex",justifyContent:"center"}}>
  <StarRating rating={4.2}></StarRating>
  </div>
  <div style={{display:"flex",justifyContent:"center"}}>
  <Typography color="white" sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
      Fydor Dostoyevski
    </Typography>
  </div>
  
  <div style={{display:"flex",justifyContent:"center"}}>
  <Typography color="white" sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
      {book.name}
    </Typography>
  </div>
  
  
  
</CardActions>
</Card>)}
   
      
</div>
    
  );
}

/*<CardMedia
        sx={{ height: 300,width:"60%" ,marginLeft:"20%",marginTop:3}}
        image={photoUrl}
        title={book.name}
      />*/