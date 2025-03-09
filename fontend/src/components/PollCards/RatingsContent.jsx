import React from "react";
import Rating from "../input/Rating";

const RatingsContent = ({ type, rating, onRatingChange }) => {
  switch (type) {
    case "rating":
      return (
        <div className="rating-criteria">
          <p>Please rate:</p>
          <Rating value={rating} onChange={onRatingChange} />
        </div>
      );
    default:
      return null;
  }
};

export default RatingsContent;
