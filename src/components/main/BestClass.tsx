import React from 'react';
import ClassCard from './ClassCard';
const BestClass = () => {
  return (
    <div>
      BestClass
      <div className="w-[85vw] flex justify-between p-2 items-center bg-slate-500">
        <button className="btn btn-circle "> </button>
        <ClassCard />
        <button className="btn btn-circle "> </button>
      </div>
    </div>
  );
};

export default BestClass;
