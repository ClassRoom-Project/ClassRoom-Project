import React from 'react';

const CurrentReserveQuantity = ({ remainingQuantity }: { remainingQuantity: number }) => {
  return <p>{`남은 자리 : ${remainingQuantity}`}</p>;
};

export default CurrentReserveQuantity;
