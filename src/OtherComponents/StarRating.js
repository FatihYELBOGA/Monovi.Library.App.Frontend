import React from 'react';
import "./StarRating.css"



const StarRating = ({ rating }) => {
  const maxRating = 5;
  const roundedRating = Math.round(rating * 2) / 2; // Round to the nearest 0.5

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= roundedRating) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<span key={i} className="star half-filled">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star">&#9733;</span>);
    }
  }

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
};

export default StarRating;
