import React from 'react';

interface StarsProps {
  rating: number;
  newStar: number;
  setNewStar: React.Dispatch<React.SetStateAction<number>>;
}

const Stars = ({ rating, newStar, setNewStar }: StarsProps) => {
  const handleOnChangeStar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStar(parseInt(e.target.value));
  };
  console.log('newStar', newStar);
  return (
    <div className="rating">
      {Array.from({ length: rating }).map((_, index) => (
        <input
          key={index + 1}
          type="radio"
          name="rating-2"
          className={`mask mask-star-2 mb-1 ${rating ? 'bg-main-color' : 'bg-button-focus-color'} `}
          disabled
          value={newStar}
          onChange={handleOnChangeStar}
          checked={rating === newStar}
        />
      ))}
    </div>
  );
};

export default Stars;
