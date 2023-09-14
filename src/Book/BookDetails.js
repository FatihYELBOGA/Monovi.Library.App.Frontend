import {useState,useEffect}  from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonoviLogo from '../image/monovi-logo.png';
import { useParams } from 'react-router-dom';
import "./BookDetails.css";
import Photo from '../OtherComponents/Photo';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BookDetails() {
  const [expanded, setExpanded] = useState(false);
  const [book,setBook] = useState(null);
  const [isLoaded,setIsLoaded] = useState(false);
  const {id} = useParams();
  const [photoUrl,setPhotoUrl] = useState(null);

  useEffect(()=>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/books/"+id)
    .then((res) => {
        if (res.status === 204) {
          // Handle 204 No Content response
          return Promise.resolve(null);
        } else {
          return res.json();
        }
      })
    .then(
        (result) => {
            setIsLoaded(true);
            console.log(result);
            if(result.photo !== null){
                setPhotoUrl(Photo(result.photo.content,result.photo.name))
                
            } 
            setBook(result);
           
        },
        (error) => {
            setIsLoaded(true);   
        }
    )

  },[id])



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if(!isLoaded){
    return(<div></div>)
  }else{

  return (
    
    <div style={{display:"flex",justifyContent:"center"}}>
        <Card sx={{ width:"40%",minWidth:"600px", mt:15}}>
        <Typography sx={{display:"flex",justifyContent:"center",mt:2,mb:2}} gutterBottom variant="h5" component="div">
          {book.name}
        </Typography>
      <CardMedia
        component="img"
        height="194"
        image={photoUrl}
        alt="Paella dish"
      />
      <CardContent>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px"}}>
                Descripton
            </Typography>
        <Typography variant="body2" color="text.secondary">
        {book.description}
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px"}}>
                Author
            </Typography>
        <Typography variant="body2" color="text.secondary">
        {book.writer.firstName +" "+book.writer.lastName}
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px"}}>
                Content
            </Typography>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:4,width:"100px"}}>
                Created By
            </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.user.firstName +" "+book.user.lastName}
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px"}}>
                Page
            </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.pageNumber}
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px"}}>
                Language
            </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.language}
        </Typography>
        </div>
      
        
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
         
        </CardContent>
      </Collapse>
    </Card>

    </div>
    
  );
  }
}