import React from 'react';

const QuantitySelector = () => {
  return (
    <div className="flex flex-col gap-2 items-center w-96 p-4 border border-solid border-black">
      <div className="flex gap-4">
        <span className="w-16 text-right">금액</span>
        <span> 50,000 </span>
      </div>
      <div className="flex gap-4">
        <span className="w-16 text-right">인원</span>
        <button> - </button>
        <span> 1 </span>
        <button> + </button>
      </div>
      <div className="flex gap-4">
        <span className="w-16 text-right">총 금액</span>
        <span> 50,000 </span>
      </div>
    </div>
  );
};

export default QuantitySelector;
