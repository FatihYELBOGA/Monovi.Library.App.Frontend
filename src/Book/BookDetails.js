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
import {  Avatar, Button, Rating } from '@mui/material';


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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const itemsPerPage = 5; // Number of authors to display per page
  const [commentNumber,setCommentNumber] = useState(0);
  const [friends,setFriends] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  
  const toggleShareOptions = () => {
    setIsSharing(!isSharing);
  };

  useEffect(() => {
    fetch(`http://fatihyelbogaa-001-site1.htempurl.com/friends/${userId}?pageNo=${1}&pageSize=${10}`)
      .then((res) => {
        if (res.status === 204) {
          return Promise.resolve([]);
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
         
          setFriends(result.content);
        },
        (error) => {
        }
      );
  }, []);

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

  useEffect(() => {
      fetch(`http://fatihyelbogaa-001-site1.htempurl.com/comments/${id}?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
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
            setComments(result.content)
            setTotalPage(result.totalPages)
            setCommentNumber(result.totalElement)
        },
        (error) => {
             console.log(error);
        }
    )

  },[id,isNew])

    

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  

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
      formData.append("UserId",userId);
      
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
  const handleShareBook = (id) =>{
    const formData = new FormData();
      formData.append("SenderUserId",userId);
      formData.append("ReceiverUserId",id);
      formData.append("BookId",book.id);
      fetch("http://fatihyelbogaa-001-site1.htempurl.com/book-sharing", {
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

  if(!isLoaded){
    return(<div></div>)
  }else{

  return (
    
    <div style={{display:"flex",justifyContent:"center"}}>
        <Card sx={{ width:"45%",minWidth:"600px", mt:15,mb:15,backgroundColor:"#fbfdfd"}}>
          <div style={{display:"flex",justifyContent:"space-between",paddingInline:"30px"}}>
        
      <Typography sx={{display:"flex",justifyContent:"center",mt:2,mb:2,fontWeight:"bold"}} gutterBottom variant="h5" component="div">
          {book.name}
        </Typography>
        <Rating
        name="simple-controlled"
        value={rating}
        onChange={handleRatingChange}
        size="large"
        max={5}
        sx={{mt:2.5,mr:1,ml:2,fontSize:24}}
      />

          </div>
        
      <CardMedia
        component="img"
       
        
        sx={{marginLeft:"25%", width:"50%"}}
        image={photoUrl}
        alt="Paella dish"
      />
      <CardContent>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px",fontWeight:"bold"}}>
                Descripton
            </Typography>
        <Typography variant="body2" >
        {book.description}
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px",fontWeight:"bold"}}>
                Author
            </Typography>
        <Typography variant="body2" >
        {book.writer.firstName +" "+book.writer.lastName}
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px",fontWeight:"bold"}}>
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
            <Typography sx={{mr:4,width:"100px",fontWeight:"bold"}}>
                Created By
            </Typography>
        <Typography variant="body2" >
          {book.user.firstName +" "+book.user.lastName}
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px",fontWeight:"bold"}}>
                Page
            </Typography>
        <Typography variant="body2" >
          {book.pageNumber}
        </Typography>
        </div>
        <div className='book-section'>
            <Typography sx={{mr:10,width:"50px",fontWeight:"bold"}}>
                Language
            </Typography>
        <Typography variant="body2">
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
        <IconButton 
            aria-label="share" 
            onClick={toggleShareOptions} // Toggle share options visibility
          >
            <ShareIcon />
          </IconButton>
        {isSharing && (
          <div style={{border:"1px solid grey",borderRadius:"12px"}}>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              {friends.map((friend) => (
                <Button
                  key={friend.id}
                  onClick={() => {
                    handleShareBook(friend.id);
                    toggleShareOptions(); // Close the share options
                  }}
                  sx={{borderBottom:1, backgroundColor:"#E9E9E9",borderRadius:"12px"}}
                >
                  {friend.profil !== null ? (
                    <>
                      <Avatar sx={{ marginRight: 2 }} src={Photo(friend.profil.content, friend.profil.name)} />
                      <Typography>{friend.firstName + " " + friend.lastName}</Typography>
                    </>
                  ) : (
                    <>
                      <Avatar sx={{ marginRight: 2 }} />
                      <Typography>{friend.firstName + " " + friend.lastName}</Typography>
                    </>
                  )}
                </Button>
              ))}
            </div>

          </div>
        )}
        <span style={{fontSize:"14px",marginLeft:"74%"}}>COMMENTS ({commentNumber})</span>
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
          <Typography variant='h6' sx={{justifyContent:"center",display:"flex",fontWeight:"bold"}}>YORUMLAR</Typography>
          <hr></hr>
          <EditCommentProfile userId={userId} bookId={book.id} isNew={isNew} setIsNew={setIsNew}></EditCommentProfile>
          {comments.map((comment)=>(
              <CommentProfile key={comment.id} comment={comment} />
          ))}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? 'active' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
          

         
        </CardContent>
      </Collapse>
    </Card>

    </div>
    
  );
  }
}