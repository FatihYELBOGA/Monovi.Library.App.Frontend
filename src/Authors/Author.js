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

  /*useEffect(() => {
    if (author.photo !== null) {
      setPhotoUrl(Photo(author.photo.content, author.photo.name));
    }
  }, []);*/

  return (
    <Card sx={{ borderRadius: 2, width: "12% !important", minWidth: 300, height: 500, ml: 2, mt: 15, backgroundColor: "#fbfdfd" }}>
      <CardMedia
        sx={{ height: 300, width: "60%", marginLeft: "20%", marginTop: 3 }}
        image={photoUrl}
        title={`Osman Altunay`}
      />
      <CardContent>
        <div style={{ height: 80 }}>
          <Typography sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
            Osman Altunay
          </Typography>
          <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body2" color="text.secondary">
           fmkoasmfolasfoas
          </Typography>
        </div>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <StarRating rating={2}></StarRating>
        <Button onClick={() => navigate(`/author-details/${1}`)} size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
/*<Card sx={{ borderRadius: 2, width: "12% !important", minWidth: 300, height: 500, ml: 2, mt: 15, backgroundColor: "#fbfdfd" }}>
      <CardMedia
        sx={{ height: 300, width: "60%", marginLeft: "20%", marginTop: 3 }}
        image={photoUrl}
        title={`${author.firstName} ${author.lastName}`}
      />
      <CardContent>
        <div style={{ height: 80 }}>
          <Typography sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }} gutterBottom variant="h7" component="div">
            {`${author.firstName} ${author.lastName}`}
          </Typography>
          <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body2" color="text.secondary">
            {author.bio}
          </Typography>
        </div>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <StarRating rating={author.rating}></StarRating>
        <Button onClick={() => navigate(`/author-details/${author.id}`)} size="small">Learn More</Button>
      </CardActions>
    </Card>*/