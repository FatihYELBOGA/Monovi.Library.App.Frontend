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
import { useParams } from 'react-router-dom';
import "./BookDetails.css";
import Photo from '../OtherComponents/Photo';
import FileContent from '../OtherComponents/FileContent';
import CommentProfile from '../Profile/CommentProfile';
import EditCommentProfile from '../Profile/EditCommentProfile';
import {  Rating } from '@mui/material';


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

export default function BookDetails(props) {
  const [favId,setFavId] = useState(0);
  const {userId} = props;
  const [expanded, setExpanded] = useState(false);
  const [book,setBook] = useState(null);
  const [isLoaded,setIsLoaded] = useState(false);
  const {id} = useParams();
  const [photoUrl,setPhotoUrl] = useState(null);
  const [content,setContent] = useState(null);
  const [rating, setRating] = useState(0);
  const [comments,setComments] = useState([]);
  const [isNew,setIsNew] = useState(false);
  const [isFav,setIsFav] = useState(false);
  const [isRating,setIsRating] = useState(false);



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
            if(result.content !== null){
              setContent(FileContent(result.content.content,result.content.name))
            }
            setBook(result);
           
        },
        (error) => {
            setIsLoaded(true);   
        }
    )

  },[id])

  useEffect(()=>{
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/comments/"+id)
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
            setComments(result)
        },
        (error) => {
             console.log(error);
        }
    )

  },[id,isNew])

  useEffect(()=>{
    
    if(book !== null){
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/ratings?bookId="+book.id+"&userId="+userId, {
      method: 'GET',
      headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include the token in the "Authorization" header.
        // You may need to add other headers based on the API requirements.
      }
    })
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
            if(result !== null){
              setIsRating(true);
              setRating(result.point);
              console.log(result.point)
            }
        },
        (error) => {
             console.log(error);
        }
    )
      }

  },[book])

  useEffect(()=>{
    
    if(book !== null){
    fetch("http://fatihyelbogaa-001-site1.htempurl.com/favorites?bookId="+book.id+"&userId="+userId, {
      method: 'GET',
      headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include the token in the "Authorization" header.
        // You may need to add other headers based on the API requirements.
      }
    })
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
            if(result !== null){
              setFavId(result.id);
              setIsFav(true);
            }
        },
        (error) => {
             console.log(error);
        }
    )
      }

  },[book])

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    
    if(isRating){
      const formData = new FormData();
      formData.append("BookId",book.id);
      formData.append("UserId",userId);
      formData.append("Point",newValue);
      fetch("http://fatihyelbogaa-001-site1.htempurl.com/ratings", {
      method: 'PUT',
      body: formData,
      headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include the token in the "Authorization" header.
        // You may need to add other headers based on the API requirements.
      }
    })
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
            if(result !== null){
              alert("Success");
            }
        },
        (error) => {
             console.log(error);
        }
    )
    }else{
      const formData = new FormData();
      formData.append("BookId",book.id);
      formData.append("UserId",userId);
      formData.append("Point",rating);
      fetch("http://fatihyelbogaa-001-site1.htempurl.com/ratings", {
      method: 'POST',
      body: formData,
      headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include the token in the "Authorization" header.
        // You may need to add other headers based on the API requirements.
      }
    })
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
            if(result !== null){
              alert("success")
            }
        },
        (error) => {
             console.log(error);
        }
    )

    }
    


  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavClick = () => {
    
    if(!isFav){
      const formData = new FormData();
      formData.append("BookId",book.id);
      formData.append("UsertId",userId);
      
      fetch("http://fatihyelbogaa-001-site1.htempurl.com/favorites", {
      method: 'POST',
      body: formData,
      headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include the token in the "Authorization" header.
        // You may need to add other headers based on the API requirements.
      }
    })
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
            if(result !== null){
              setIsFav(true);
              alert("Success");
            }
        },
        (error) => {
             console.log(error);
        }
    )
    }else{
      fetch("http://fatihyelbogaa-001-site1.htempurl.com/favorites/"+favId, {
      method: 'DELETE',
      headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include the token in the "Authorization" header.
        // You may need to add other headers based on the API requirements.
      }
    })
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
            if(result !== null){
              setIsFav(false);
              alert("success")
            }
        },
        (error) => {
             console.log(error);
        }
    )

    }
  }

  if(!isLoaded){
    return(<div></div>)
  }else{

  return (
    
    <div style={{display:"flex",justifyContent:"center"}}>
        <Card sx={{ width:"45%",minWidth:"600px", mt:15,mb:15,backgroundColor:"#fbfdfd"}}>
          <div style={{display:"flex"}}>
          
        <Rating
        name="simple-controlled"
        value={rating}
        onChange={handleRatingChange}
        size="large"
        max={5}
        sx={{mt:2.5,mr:1,ml:2,fontSize:24}}
      />
      <Typography sx={{display:"flex",justifyContent:"center",mt:2,mb:2}} gutterBottom variant="h5" component="div">
          {book.name}
        </Typography>
          </div>
        
      <CardMedia
        component="img"
       
        
        sx={{marginLeft:"25%", width:"50%"}}
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
        {content && (
                  <a href={URL.createObjectURL(content)} target="_blank" rel="noopener noreferrer">
                    {book.name +" Content"}
                  </a>
                )}
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
        <IconButton 
        onClick={handleFavClick}
        aria-label="add to favorites">
          <FavoriteIcon 
          sx={{color: isFav ? "red" : "grey"}} />
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
          <Typography variant='h6' sx={{justifyContent:"center",display:"flex"}}>YORUMLAR</Typography>
          <EditCommentProfile userId={userId} bookId={book.id} isNew={isNew} setIsNew={setIsNew}></EditCommentProfile>
          {comments.map((comment)=>(
              <CommentProfile key={comment.id} comment={comment} />
          ))}
          

         
        </CardContent>
      </Collapse>
    </Card>

    </div>
    
  );
  }
}