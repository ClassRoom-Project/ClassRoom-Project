import React from 'react';

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="rating">
      {Array.from({ length: rating }).map((_, index) => (
        <input key={index + 1} type="radio" name="rating-2" className="mask mask-star-2 bg-point-purple" disabled />
      ))}
    </div>
  );
};

export default Stars;
