import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Photo from '../OtherComponents/Photo';
import Button  from '@mui/material/Button';
import { CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Author(props) {
  const { author,role,setAuthorRender,authorRender } = props;
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (author.profil !== null) {
      setPhotoUrl(Photo(author.profil.content, author.profil.name));
    }
  }, []);

  const handleDeleteAuthors = () =>{
    fetch(`http://fatihyelbogaa-001-site1.htempurl.com/writers/`+author.id, {
  method: 'DELETE',
})
  .then((result) =>{
    console.log(result);
    alert("Deleted!")
    setAuthorRender(!authorRender)
  });
    
    
  }

  return (
    <div style={{}}>
      {(role !=="ADMIN") ? (
         <Link  to={`/author-details/${author.id}`} style={{ textDecoration: 'none',height:"auto" }}>
         <Card
       sx={{
         borderRadius: 2,
         width: "12% !important",
         minWidth: 240,
         height: 350,
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
       <CardContent sx={{ mt: 31 }}>
         {/* Card content goes here */}
       </CardContent>
       <CardActions sx={{ display:"block",height:60, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
       
       <div style={{display:"flex",justifyContent:"center"}}>
       <Typography color="white" sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
                 {author.firstName+" "+author.lastName}
               </Typography>
       </div>
       
       <div style={{display:"flex",justifyContent:"center"}}>
       <Typography color="white" sx={{ display: "flex", justifyContent: "center" }} gutterBottom variant="h7" component="div">
                {author.nationality}
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
        minWidth: 240,
        height: 350,
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
      onClick={handleDeleteAuthors}
      sx={{color:"black",justifyContent:"right",marginLeft:"70%"}}>
      
      
      <DeleteIcon/>
      </Button>
      
      <CardContent sx={{ mt: 31 }}>
        
      </CardContent>
      <CardActions sx={{ display:"block",height:60, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      
      <div style={{display:"flex",justifyContent:"center"}}>
      <Typography color="white" sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
                {author.firstName+" "+author.lastName}
              </Typography>
      </div>
      
      <div style={{display:"flex",justifyContent:"center"}}>
      <Typography color="white" sx={{ display: "flex", justifyContent: "center" }} gutterBottom variant="h7" component="div">
               {author.nationality}
              </Typography>
      </div>
      
      
      
    </CardActions>
    </Card>
  
      )}
     

    </div>
    

    
  );
}
