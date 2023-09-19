import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarRating from '../OtherComponents/StarRating';
import { useNavigate } from 'react-router-dom';
import Photo from '../OtherComponents/Photo';
import Button  from '@mui/material/Button';
import { CardActions } from '@mui/material';

export default function Author(props) {
  const { author } = props;
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (author.profil !== null) {
      setPhotoUrl(Photo(author.profil.content, author.profil.name));
    }
  }, []);

  return (
    <Card sx={{ borderRadius: 2, width: "12% !important", minWidth: 250, height: 360, ml: 2, mt: 15, backgroundColor: "#fbfdfd" }}>
      <CardMedia
        sx={{ height: 200, width: "80%", marginLeft: "10%", marginTop: 3 }}
        image={photoUrl}
        title={`Osman Altunay`}
      />
      <CardContent>
        <div style={{  }}>
          <Typography sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
            {author.firstName+" "+author.lastName}
          </Typography>
          <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body2" color="text.secondary">
           {author.nationality}
          </Typography>
        </div>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "right" }}> 
        <Button onClick={() => navigate(`/author-details/${author.id}`)} size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
