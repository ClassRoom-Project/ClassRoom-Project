import React from 'react';
import { ClassAllType } from '@/types/class';

const MapImage = ({ classData }: { classData: ClassAllType }) => {
  return (
    <div>
      <div>
        <div>{}</div>
        <p>{classData.title}</p>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default MapImage;
